import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';
import { localCommunities, Assembly } from '../../services/FirebaseService';

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
  onScheduleClick: (localCommunityId: string) => void;
  onRegisterClick: (assemblyId: string) => void;
}

function BelgradeMap({ 
  assemblies, 
  onMarkerClick, 
  selectedCommunity,
  onScheduleClick,
  onRegisterClick
}: BelgradeMapProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>([44.8125, 20.4612]);
  
  // Update map center when selected community changes
  useEffect(() => {
    if (selectedCommunity) {
      const community = localCommunities.find(c => c.id === selectedCommunity);
      if (community) {
        setMapCenter([community.coordinates.lat, community.coordinates.lng]);
      }
    }
  }, [selectedCommunity]);
  
  // Handle schedule button click
  const handleScheduleClick = (e: React.MouseEvent, localCommunityId: string) => {
    e.stopPropagation();
    onScheduleClick(localCommunityId);
  };
  
  // Handle register button click
  const handleRegisterClick = (e: React.MouseEvent, assemblyId: string) => {
    e.stopPropagation();
    onRegisterClick(assemblyId);
  };
  
  // Get assembly for a local community
  const getAssemblyForCommunity = (localCommunityId: string) => {
    return assemblies.find(assembly => assembly.localCommunityId === localCommunityId);
  };
  
  // Get icon based on assembly status
  const getMarkerIcon = (localCommunityId: string) => {
    const assembly = getAssemblyForCommunity(localCommunityId);
    
    if (!assembly) {
      return neverScheduledIcon;
    }
    
    switch (assembly.status) {
      case 'confirmed':
        return confirmedIcon;
      case 'scheduled':
        return scheduledIcon;
      default:
        return neverScheduledIcon;
    }
  };
  
  return (
    <MapContainer 
      center={mapCenter} 
      zoom={12} 
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapCenter center={mapCenter} />
      
      {localCommunities.map(community => {
        const assembly = getAssemblyForCommunity(community.id);
        const markerIcon = getMarkerIcon(community.id);
        
        return (
          <Marker
            key={community.id}
            position={[community.coordinates.lat, community.coordinates.lng]}
            icon={markerIcon}
            eventHandlers={{
              click: () => onMarkerClick(community.id)
            }}
          >
            <Popup className="custom-popup">
              <div className="popup-content">
                <h3 className="popup-title">{community.name}</h3>
                
                {assembly ? (
                  <>
                    <div className="popup-info">
                      <p><strong>Status:</strong> {
                        assembly.status === 'confirmed' ? 'Potvrđen' : 
                        assembly.status === 'scheduled' ? 'Zakazan' : 'Nije zakazan'
                      }</p>
                      <p><strong>Datum:</strong> {assembly.date}</p>
                      <p><strong>Vreme:</strong> {assembly.time}</p>
                      <p><strong>Adresa:</strong> {assembly.address}</p>
                      <p><strong>Broj potpisa:</strong> {assembly.signatureCount}</p>
                    </div>
                    
                    <div className="popup-actions">
                      <button 
                        className="popup-button register"
                        onClick={(e) => handleRegisterClick(e, assembly.id)}
                      >
                        Potpiši peticiju
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="popup-info">
                      <p>Zbor građana još uvek nije zakazan u ovoj mesnoj zajednici.</p>
                    </div>
                    
                    <div className="popup-actions">
                      <button 
                        className="popup-button schedule"
                        onClick={(e) => handleScheduleClick(e, community.id)}
                      >
                        Zakaži zbor
                      </button>
                    </div>
                  </>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default BelgradeMap; 