import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';
import { localCommunities, Assembly, SIGNATURE_THRESHOLD } from '../../services/FirebaseService';
import { ZoomControl } from 'react-leaflet';
import { X, AlertCircle } from 'lucide-react';
import InitiativeForm from './InitiativeForm';
import AssemblyRegistrationForm from './AssemblyRegistrationForm';

// Fix for Leaflet icon issue
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom icons for different assembly statuses
const neverScheduledIcon = L.divIcon({
  className: 'custom-marker never-scheduled',
  html: `<div class="marker-pin">
           <div class="marker-pin-inner"></div>
         </div>`,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50]
});

const scheduledIcon = L.divIcon({
  className: 'custom-marker scheduled',
  html: `<div class="marker-pin">
           <div class="marker-pin-inner"></div>
         </div>`,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50]
});

const confirmedIcon = L.divIcon({
  className: 'custom-marker confirmed',
  html: `<div class="marker-pin">
           <div class="marker-pin-inner"></div>
         </div>`,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50]
});

// Component to recenter map based on selected community
function MapCenter({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  
  return null;
}

interface BelgradeMapProps {
  assemblies: Assembly[];
  onMarkerClick: (localCommunityId: string) => void;
  selectedCommunity: string | null;
  onScheduleAssembly: (
    localCommunityId: string,
    date: string,
    time: string,
    email: string,
    name: string,
    phone: string,
    address: string,
    description: string
  ) => Promise<void>;
  onRegisterAttendee: (email: string, name: string, assemblyId: string) => Promise<void>;
}

function BelgradeMap({
  assemblies,
  onMarkerClick,
  selectedCommunity,
  onScheduleAssembly,
  onRegisterAttendee
}: BelgradeMapProps) {
  const [center, setCenter] = useState<[number, number]>([44.7866, 20.4489]);
  const [showScheduleForm, setShowScheduleForm] = useState<string | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [localSelectedCommunity, setLocalSelectedCommunity] = useState<string | null>(selectedCommunity);

  useEffect(() => {
    if (selectedCommunity) {
      setLocalSelectedCommunity(selectedCommunity);
      const community = localCommunities.find(c => c.id === selectedCommunity);
      if (community) {
        setCenter([community.coordinates.lat, community.coordinates.lng]);
      }
    }
  }, [selectedCommunity]);

  useEffect(() => {
    if (localSelectedCommunity) {
      const community = localCommunities.find(c => c.id === localSelectedCommunity);
      if (community) {
        setCenter([community.coordinates.lat, community.coordinates.lng]);
      }
    }
  }, [localSelectedCommunity]);

  const handleCloseForm = () => {
    setShowScheduleForm(null);
    setShowRegistrationForm(null);
    setFormError(null);
  };

  const getAssemblyForCommunity = (localCommunityId: string) => {
    return assemblies.find(assembly => assembly.localCommunityId === localCommunityId);
  };

  const getMarkerIcon = (localCommunityId: string) => {
    const assembly = getAssemblyForCommunity(localCommunityId);
    if (!assembly) return neverScheduledIcon;
    return assembly.status === 'confirmed' ? confirmedIcon : scheduledIcon;
  };

  const handleShowScheduleForm = (e: React.MouseEvent, communityId: string) => {
    e.stopPropagation();
    setLocalSelectedCommunity(communityId);
    setShowScheduleForm(communityId);
    setShowRegistrationForm(null);
    setFormError(null);
  };

  const handleShowRegistrationForm = (e: React.MouseEvent, assemblyId: string) => {
    e.stopPropagation();
    setShowRegistrationForm(assemblyId);
    setShowScheduleForm(null);
    setFormError(null);
  };

  return (
    <div className="relative h-full">
      <MapContainer
        center={center}
        zoom={12}
        className="h-full w-full"
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <div className="absolute top-4 right-4 z-[1000] bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-sm font-semibold mb-2">Status zbora:</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-sm">Nije sazvan</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm">Sazvan</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm">Potvrđen</span>
            </div>
          </div>
        </div>
        
        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-background p-4 rounded-md shadow-md">
          <h3 className="text-sm font-medium mb-2">Legenda</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-red-500 mr-2"></div>
              <span className="text-xs">Zbor nije zakazan</span>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-red-600 mr-2"></div>
              <span className="text-xs">Zbor je zakazan</span>
            </div>
          </div>
        </div>
        
        <MapCenter center={center} />
        
        {localCommunities.map((community) => {
          const assembly = getAssemblyForCommunity(community.id);
          const icon = getMarkerIcon(community.id);
          
          return (
            <Marker
              key={community.id}
              position={[community.coordinates.lat, community.coordinates.lng]}
              icon={icon}
              eventHandlers={{
                click: () => onMarkerClick(community.id)
              }}
            >
              <Popup className="custom-popup">
                <div className="popup-content">
                  <h3 className="popup-title">{community.name}</h3>
                  <div className="popup-info">
                    <p><strong>Adresa:</strong> {community.address}</p>
                    <p><strong>Poštanski broj:</strong> {community.postalCode}</p>
                    {assembly && (
                      <>
                        <p><strong>Status:</strong> {assembly.status === 'confirmed' ? 'Potvrđen' : 'Zakazan'}</p>
                        <p><strong>Broj potpisa:</strong> {assembly.signatureCount}</p>
                      </>
                    )}
                  </div>
                  <div className="popup-actions">
                    {assembly ? (
                      <button
                        className="popup-button register"
                        onClick={(e) => handleShowRegistrationForm(e, assembly.id)}
                      >
                        Potpiši peticiju
                      </button>
                    ) : (
                      <button
                        className="popup-button schedule"
                        onClick={(e) => handleShowScheduleForm(e, community.id)}
                      >
                        Zakaži zbor
                      </button>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {showScheduleForm && (
          <div className="calendar-popup">
            <div className="calendar-popup-content">
              <InitiativeForm
                localCommunityId={showScheduleForm}
                onSubmit={async (data) => {
                  try {
                    await onScheduleAssembly(
                      data.localCommunityId,
                      data.date,
                      data.time,
                      data.email,
                      data.name,
                      data.contactPhone,
                      data.address,
                      data.description
                    );
                    handleCloseForm();
                  } catch (err) {
                    const errorMessage = err instanceof Error ? err.message : 'Došlo je do greške';
                    setFormError(errorMessage);
                    // Don't close form on error
                  }
                }}
                onClose={handleCloseForm}
                formError={formError}
              />
            </div>
          </div>
        )}

        {showRegistrationForm && (
          <div className="calendar-popup">
            <div className="calendar-popup-content">
              <div className="calendar-popup-header">
                <h3>Potpiši peticiju</h3>
                <button 
                  className="calendar-popup-close"
                  onClick={handleCloseForm}
                >
                  <X size={24} />
                </button>
              </div>
              <AssemblyRegistrationForm
                assembly={assemblies.find(a => a.id === showRegistrationForm) || {
                  id: showRegistrationForm || '',
                  localCommunityId: localSelectedCommunity || '',
                  localCommunityName: localCommunities.find(c => c.id === localSelectedCommunity)?.name || '',
                  address: localCommunities.find(c => c.id === localSelectedCommunity)?.address || '',
                  description: '',
                  status: 'scheduled',
                  signatureCount: 0,
                  date: '',
                  time: ''
                }}
                onRegister={async (email, name) => {
                  try {
                    await onRegisterAttendee(email, name, showRegistrationForm || '');
                    handleCloseForm();
                  } catch (err) {
                    setFormError(err instanceof Error ? err.message : 'Došlo je do greške');
                  }
                }}
                isRegistered={false}
              />
              {formError && (
                <div className="form-error">
                  <AlertCircle className="form-error-icon" size={16} />
                  <span className="form-error-message">{formError}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </MapContainer>
    </div>
  );
}

export default BelgradeMap; 