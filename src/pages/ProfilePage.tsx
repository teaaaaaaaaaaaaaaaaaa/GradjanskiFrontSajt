import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Mail, MapPin, Calendar, Settings, Bell, LogOut, Users, FileText } from 'lucide-react'

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')

  // Mock user data
  const user = {
    firstName: 'Marko',
    lastName: 'Petrović',
    email: 'marko.petrovic@example.com',
    location: 'Vračar, Beograd',
    joinedDate: '15. maj 2023.',
    interests: ['Ekologija', 'Obrazovanje', 'Kultura'],
    groups: [
      {
        id: 1,
        name: 'Ekološka radna grupa',
        role: 'Član',
        lastActivity: '10. jun 2023.',
      },
      {
        id: 2,
        name: 'Obrazovna radna grupa',
        role: 'Koordinator',
        lastActivity: '5. jun 2023.',
      },
    ],
    events: [
      {
        id: 1,
        name: 'Zbor građana MZ Vračar',
        type: 'Zbor',
        date: '25. jun 2023.',
        status: 'Predstojeći',
      },
      {
        id: 2,
        name: 'Plenum o obrazovnom sistemu',
        type: 'Plenum',
        date: '18. jun 2023.',
        status: 'Predstojeći',
      },
      {
        id: 3,
        name: 'Akcija čišćenja parka',
        type: 'Akcija',
        date: '1. jun 2023.',
        status: 'Prošli',
      },
    ],
    notifications: {
      email: true,
      browser: false,
      zborovi: true,
      plenumi: true,
      radneGrupe: true,
      vesti: false,
    },
  }

  const tabs = [
    { id: 'profile', label: 'Profil', icon: <User className="h-5 w-5" /> },
    { id: 'groups', label: 'Radne grupe', icon: <Users className="h-5 w-5" /> },
    { id: 'events', label: 'Događaji', icon: <Calendar className="h-5 w-5" /> },
    { id: 'notifications', label: 'Obaveštenja', icon: <Bell className="h-5 w-5" /> },
    { id: 'settings', label: 'Podešavanja', icon: <Settings className="h-5 w-5" /> },
  ]

  return (
    <div className="pt-16">
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-2xl mr-4">
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{user.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden sticky top-20">
              <nav className="divide-y divide-border">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`w-full flex items-center p-4 text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
                <Link
                  to="/logout"
                  className="w-full flex items-center p-4 text-left text-destructive hover:bg-muted transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <span>Odjavi se</span>
                </Link>
              </nav>
            </div>
          </div>

          <div className="md:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">Informacije o profilu</h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Ime i prezime</h3>
                        <p className="text-lg">
                          {user.firstName} {user.lastName}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Email adresa</h3>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <p className="text-lg">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Lokacija</h3>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <p className="text-lg">{user.location}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Član od</h3>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <p className="text-lg">{user.joinedDate}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Oblasti interesovanja</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <button className="px-4 py-2 bg-secondary text-foreground rounded-md font-medium hover:bg-secondary/80 transition-colors">
                        Izmeni profil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'groups' && (
              <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Moje radne grupe</h2>
                    <Link
                      to="/radne-grupe"
                      className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
                    >
                      Istraži radne grupe
                    </Link>
                  </div>

                  {user.groups.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Niste član nijedne radne grupe</h3>
                      <p className="text-muted-foreground mb-4">
                        Pridružite se radnim grupama prema vašim interesima i veštinama.
                      </p>
                      <Link
                        to="/radne-grupe"
                        className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
                      >
                        Istraži radne grupe
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {user.groups.map((group) => (
                        <div
                          key={group.id}
                          className="p-4 border border-border rounded-md hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium mb-1">{group.name}</h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs mr-2 ${
                                    group.role === 'Koordinator'
                                      ? 'bg-primary/10 text-primary'
                                      : 'bg-muted-foreground/10'
                                  }`}
                                >
                                  {group.role}
                                </span>
                                <span>Poslednja aktivnost: {group.lastActivity}</span>
                              </div>
                            </div>
                            <Link
                              to={`/radne-grupe/${group.id}`}
                              className="text-primary hover:underline text-sm"
                            >
                              Pogledaj
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Moji događaji</h2>
                    <div className="flex gap-2">
                      <Link
                        to="/zborovi"
                        className="px-4 py-2 bg-secondary text-foreground rounded-md font-medium hover:bg-secondary/80 transition-colors"
                      >
                        Zborovi
                      </Link>
                      <Link
                        to="/plenumi"
                        className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
                      >
                        Plenumi
                      </Link>
                    </div>
                  </div>

                  {user.events.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Niste prijavljeni ni na jedan događaj</h3>
                      <p className="text-muted-foreground mb-4">
                        Prijavite se za učešće na zborovima, plenumima i drugim događajima.
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Link
                          to="/zborovi"
                          className="px-4 py-2 bg-secondary text-foreground rounded-md font-medium hover:bg-secondary/80 transition-colors"
                        >
                          Zborovi
                        </Link>
                        <Link
                          to="/plenumi"
                          className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
                        >
                          Plenumi
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {user.events.map((event) => (
                        <div
                          key={event.id}
                          className="p-4 border border-border rounded-md hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium mb-1">{event.name}</h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs mr-2 ${
                                    event.type === 'Zbor'
                                      ? 'bg-primary/10 text-primary'
                                      : event.type === 'Plenum'
                                      ? 'bg-blue-500/10 text-blue-500'
                                      : 'bg-green-500/10 text-green-500'
                                  }`}
                                >
                                  {event.type}
                                </span>
                                <span>Datum: {event.date}</span>
                              </div>
                            </div>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                event.status === 'Predstojeći'
                                  ? 'bg-primary/10 text-primary'
                                  : 'bg-muted-foreground/10 text-muted-foreground'
                              }`}
                            >
                              {event.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">Podešavanja obaveštenja</h2>

                  <div className="space-y-6">
                    <div className="border-b border-border pb-4">
                      <h3 className="text-lg font-medium mb-4">Način primanja obaveštenja</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                            <span>Email obaveštenja</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={user.notifications.email}
                              readOnly
                            />
                            <div className="w-11 h-6 bg-muted-foreground/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Bell className="h-5 w-5 mr-3 text-muted-foreground" />
                            <span>Browser obaveštenja</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={user.notifications.browser}
                              readOnly
                            />
                            <div className="w-11 h-6 bg-muted-foreground/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Kategorije obaveštenja</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Users className="h-5 w-5 mr-3 text-muted-foreground" />
                            <span>Zborovi</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={user.notifications.zborovi}
                              readOnly
                            />
                            <div className="w-11 h-6 bg-muted-foreground/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Users className="h-5 w-5 mr-3 text-muted-foreground" />
                            <span>Plenumi</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={user.notifications.plenumi}
                              readOnly
                            />
                            <div className="w-11 h-6 bg-muted-foreground/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Users className="h-5 w-5 mr-3 text-muted-foreground" />
                            <span>Radne grupe</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={user.notifications.radneGrupe}
                              readOnly
                            />
                            <div className="w-11 h-6 bg-muted-foreground/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                            <span>Vesti i obaveštenja</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={user.notifications.vesti}
                              readOnly
                            />
                            <div className="w-11 h-6 bg-muted-foreground/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <button className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors">
                        Sačuvaj podešavanja
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">Podešavanja naloga</h2>

                  <div className="space-y-6">
                    <div className="border-b border-border pb-6">
                      <h3 className="text-lg font-medium mb-4">Promena lozinke</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium mb-2">
                            Trenutna lozinka
                          </label>
                          <input
                            type="password"
                            id="currentPassword"
                            className="w-full px-4 py-3 rounded-md border border-input bg-background"
                            placeholder="••••••••"
                          />
                        </div>
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
                            Nova lozinka
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            className="w-full px-4 py-3 rounded-md border border-input bg-background"
                            placeholder="••••••••"
                          />
                        </div>
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                            Potvrdite novu lozinku
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            className="w-full px-4 py-3 rounded-md border border-input bg-background"
                            placeholder="••••••••"
                          />
                        </div>
                        <button className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors">
                          Promeni lozinku
                        </button>
                      </div>
                    </div>

                    <div className="border-b border-border pb-6">
                      <h3 className="text-lg font-medium mb-4">Jezik i region</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="language" className="block text-sm font-medium mb-2">
                            Jezik
                          </label>
                          <select
                            id="language"
                            className="w-full px-4 py-3 rounded-md border border-input bg-background"
                          >
                            <option value="sr">Srpski</option>
                            <option value="en">English</option>
                          </select>
                        </div>
                        <button className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors">
                          Sačuvaj podešavanja
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4 text-destructive">Opasna zona</h3>
                      <div className="space-y-4">
                        <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4">
                          <h4 className="font-medium text-destructive mb-2">Brisanje naloga</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Kada obrišete svoj nalog, svi vaši podaci će biti trajno izbrisani. Ova akcija je nepovratna.
                          </p>
                          <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md font-medium hover:bg-destructive/90 transition-colors">
                            Obriši nalog
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage 