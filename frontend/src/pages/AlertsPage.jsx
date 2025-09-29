import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  AlertTriangle, 
  Bell, 
  Filter,
  X,
  MapPin,
  Calendar,
  Clock,
  Info,
  Shield,
  CloudRain,
  Siren,
  ChevronDown,
  Search,
  RefreshCw
} from 'lucide-react';
import { Sidebar, DashboardHeader } from './Dashboard';

const AlertsPage = () => {
  const { t } = useTranslation();
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filterType, setFilterType] = useState('All Types');
  const [filterSeverity, setFilterSeverity] = useState('All Severities');
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [severityDropdownOpen, setSeverityDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample alerts data
  const alerts = [
    {
      id: 1,
      title: "Avian Flu Alert - Regional",
      description: "Cases of H5N1 reported within 50km radius. Implement enhanced biosecurity measures immediately.",
      severity: "HIGH",
      type: "Outbreak",
      icon: <AlertTriangle size={24} />,
      date: "2025-01-14",
      time: "08:30 AM",
      location: "Punjab Region",
      status: "active",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      iconColor: "text-red-600",
      badgeColor: "bg-red-100 text-red-700",
      actionRequired: true,
      details: "Multiple poultry farms in the region have reported suspected cases. Increase surveillance and restrict movement of birds."
    },
    {
      id: 2,
      title: "Updated Vaccination Requirements",
      description: "New government guidelines for poultry vaccination schedules effective January 20th.",
      severity: "MEDIUM",
      type: "Regulation",
      icon: <Bell size={24} />,
      date: "2025-01-13",
      time: "02:15 PM",
      location: "National",
      status: "active",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      iconColor: "text-yellow-600",
      badgeColor: "bg-yellow-100 text-yellow-700",
      actionRequired: true,
      details: "Review and update your vaccination protocols to comply with new government standards."
    },
    {
      id: 3,
      title: "Heavy Rain Warning",
      description: "Expected heavy rainfall may affect feed storage areas. Ensure proper drainage and covering.",
      severity: "LOW",
      type: "Weather",
      icon: <CloudRain size={24} />,
      date: "2025-01-12",
      time: "06:45 AM",
      location: "Regional",
      status: "active",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      badgeColor: "bg-blue-100 text-blue-700",
      actionRequired: false,
      details: "Monitor feed storage areas and ensure adequate protection from moisture."
    },
    {
      id: 4,
      title: "Biosecurity Training Reminder",
      description: "Annual biosecurity training certification expires in 7 days.",
      severity: "MEDIUM",
      type: "Training",
      icon: <Info size={24} />,
      date: "2025-01-11",
      time: "10:00 AM",
      location: "Farm Specific",
      status: "pending",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
      badgeColor: "bg-purple-100 text-purple-700",
      actionRequired: true,
      details: "Complete the required training modules before the certification expires."
    },
    {
      id: 5,
      title: "Feed Contamination Alert",
      description: "Contaminated feed batch recalled. Check lot numbers: FB2025-0108 to FB2025-0115.",
      severity: "CRITICAL",
      type: "Food Safety",
      icon: <Shield size={24} />,
      date: "2025-01-10",
      time: "11:20 AM",
      location: "Multi-Regional",
      status: "resolved",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      iconColor: "text-gray-600",
      badgeColor: "bg-gray-100 text-gray-700",
      actionRequired: false,
      details: "Immediate action required to check and dispose of any affected feed batches."
    }
  ];

  // Filter options
  const alertTypes = ['All Types', 'Outbreak', 'Regulation', 'Weather', 'Training', 'Food Safety'];
  const severityLevels = ['All Severities', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

  // Filter alerts based on selected filters and search
  const filteredAlerts = alerts.filter(alert => {
    const matchesType = filterType === 'All Types' || alert.type === filterType;
    const matchesSeverity = filterSeverity === 'All Severities' || alert.severity === filterSeverity;
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSeverity && matchesSearch;
  });

  // Get alert counts by severity
  const alertCounts = {
    critical: alerts.filter(a => a.severity === 'CRITICAL' && a.status === 'active').length,
    high: alerts.filter(a => a.severity === 'HIGH' && a.status === 'active').length,
    medium: alerts.filter(a => a.severity === 'MEDIUM' && a.status === 'active').length,
    low: alerts.filter(a => a.severity === 'LOW' && a.status === 'active').length
  };

  const totalActiveAlerts = alertCounts.critical + alertCounts.high + alertCounts.medium + alertCounts.low;

  const AlertCard = ({ alert }) => (
    <div className={`alert-card ${alert.bgColor} ${alert.borderColor} border rounded-xl p-6 mb-4 hover:shadow-md transition-all duration-300 cursor-pointer`}
         onClick={() => setSelectedAlert(alert)}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          <div className={`p-3 ${alert.bgColor} ${alert.iconColor} rounded-lg`}>
            {alert.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold text-[#08202b]">{alert.title}</h3>
              {alert.status === 'resolved' && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                  Resolved
                </span>
              )}
              {alert.actionRequired && alert.status === 'active' && (
                <span className="alert-badge-pulse text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                  Action Required
                </span>
              )}
            </div>
            <p className="text-[#5b6770] mb-3 leading-relaxed">{alert.description}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#5b6770]">
              <span className={`px-3 py-1 rounded-full font-medium ${alert.badgeColor}`}>
                {alert.severity}
              </span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
                {alert.type}
              </span>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{alert.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{alert.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{alert.location}</span>
              </div>
            </div>
          </div>
        </div>
        
        <button className="text-gray-400 hover:text-gray-600 p-1 transition-colors">
          <X size={20} />
        </button>
      </div>
    </div>
  );

  const AlertModal = ({ alert, onClose }) => {
    if (!alert) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 ${alert.bgColor} ${alert.iconColor} rounded-lg`}>
                  {alert.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#08202b] mb-1">{alert.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full font-medium text-sm ${alert.badgeColor}`}>
                      {alert.severity}
                    </span>
                    <span className="text-sm text-[#5b6770]">{alert.type}</span>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2">
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-[#5b6770] mb-6 leading-relaxed">{alert.description}</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-[#08202b] mb-2">Additional Details</h4>
              <p className="text-[#5b6770]">{alert.details}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-sm font-medium text-[#5b6770] block mb-1">Date & Time</span>
                <span className="text-[#08202b]">{alert.date} at {alert.time}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-[#5b6770] block mb-1">Location</span>
                <span className="text-[#08202b]">{alert.location}</span>
              </div>
            </div>
            
            {alert.actionRequired && (
              <div className="flex gap-3">
                <button className="flex-1 bg-[#0f766e] hover:bg-[#0b5e53] text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                  Take Action
                </button>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#08202b] py-3 px-6 rounded-lg font-semibold transition-colors">
                  Mark as Read
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#f6fbf9] font-sans">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f6fbf9] p-8">
          <div className="container mx-auto max-w-7xl">
            
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#0f766e] to-[#0ea5a1] text-white p-6 md:p-8 rounded-xl shadow-lg mb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                <div className="w-full lg:w-auto mb-6 lg:mb-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                    <div className="p-3 bg-white/20 rounded-full">
                      <Bell size={32} />
                    </div>
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold">{t('alerts') || 'Alerts'}</h1>
                      <p className="text-teal-100">{t('real_time_notifications') || 'Real-time notifications and updates'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center lg:text-right">
                  <div className="text-3xl md:text-4xl font-bold mb-1">{totalActiveAlerts}</div>
                  <p className="text-teal-100">{t('active_alerts') || 'Active alerts'}</p>
                </div>
              </div>
            </div>

            {/* Alert Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
                <div className="text-2xl font-bold text-red-600">{alertCounts.critical}</div>
                <div className="text-sm text-[#5b6770]">{t('critical') || 'Critical'}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
                <div className="text-2xl font-bold text-orange-600">{alertCounts.high}</div>
                <div className="text-sm text-[#5b6770]">{t('high_priority') || 'High Priority'}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
                <div className="text-2xl font-bold text-yellow-600">{alertCounts.medium}</div>
                <div className="text-sm text-[#5b6770]">{t('medium') || 'Medium'}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                <div className="text-2xl font-bold text-blue-600">{alertCounts.low}</div>
                <div className="text-sm text-[#5b6770]">{t('low_priority') || 'Low Priority'}</div>
              </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search alerts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent"
                    />
                  </div>

                  {/* Filter by Type */}
                  <div className="relative">
                    <button
                      onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors min-w-[150px] justify-between"
                    >
                      <span className="text-sm font-medium">Filter by Type</span>
                      <ChevronDown size={16} />
                    </button>
                    {typeDropdownOpen && (
                      <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        {alertTypes.map(type => (
                          <button
                            key={type}
                            onClick={() => { setFilterType(type); setTypeDropdownOpen(false); }}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${filterType === type ? 'bg-[#0f766e] text-white' : ''}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Filter by Severity */}
                  <div className="relative">
                    <button
                      onClick={() => setSeverityDropdownOpen(!severityDropdownOpen)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors min-w-[150px] justify-between"
                    >
                      <span className="text-sm font-medium">Filter by Severity</span>
                      <ChevronDown size={16} />
                    </button>
                    {severityDropdownOpen && (
                      <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        {severityLevels.map(severity => (
                          <button
                            key={severity}
                            onClick={() => { setFilterSeverity(severity); setSeverityDropdownOpen(false); }}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${filterSeverity === severity ? 'bg-[#0f766e] text-white' : ''}`}
                          >
                            {severity}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-[#0f766e] hover:bg-[#0b5e53] text-white rounded-lg font-semibold transition-colors">
                  <RefreshCw size={16} />
                  Refresh
                </button>
              </div>
              
              {/* Active Filters Display */}
              {(filterType !== 'All Types' || filterSeverity !== 'All Severities' || searchQuery) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {filterType !== 'All Types' && (
                      <span className="bg-[#0f766e] text-white px-3 py-1 rounded-full text-sm font-medium">
                        Type: {filterType}
                      </span>
                    )}
                    {filterSeverity !== 'All Severities' && (
                      <span className="bg-[#0f766e] text-white px-3 py-1 rounded-full text-sm font-medium">
                        Severity: {filterSeverity}
                      </span>
                    )}
                    {searchQuery && (
                      <span className="bg-[#0f766e] text-white px-3 py-1 rounded-full text-sm font-medium">
                        Search: "{searchQuery}"
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Alerts List */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-[#08202b] mb-6">
                Recent Alerts ({filteredAlerts.length})
              </h2>
              
              {filteredAlerts.length === 0 ? (
                <div className="text-center py-12">
                  <Bell size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No alerts match your current filters</p>
                  <p className="text-gray-400 text-sm">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div>
                  {filteredAlerts.map(alert => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      
      {/* Alert Detail Modal */}
      <AlertModal alert={selectedAlert} onClose={() => setSelectedAlert(null)} />
    </div>
  );
};

export default AlertsPage;