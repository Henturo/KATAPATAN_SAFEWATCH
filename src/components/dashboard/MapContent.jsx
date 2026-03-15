import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { MapPin, RefreshCcw, Loader2 } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Component to handle map invalidation when container size is ready
const MapInvalidator = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
};

const MapContent = ({ reports, isDarkMode, onRefresh, isLoading }) => {
  const mapCenter = [14.2464, 121.1356]; // Katapatan Homes, Cabuyao
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setMapReady(true);
  }, []);

  return (
    <div className="flex flex-col w-full h-full max-w-6xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-10 px-4 md:px-0">
        <div>
          <h2 className="font-black text-blue-950 dark:text-white text-3xl md:text-4xl tracking-tight">Live Community Map</h2>
          <p className="text-gray-400 dark:text-slate-500 font-medium mt-1">Real-time visualization of neighborhood safety.</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 min-h-[500px] w-full bg-slate-100 dark:bg-slate-900 rounded-[3rem] border border-gray-100 dark:border-slate-800 relative overflow-hidden shadow-2xl shadow-blue-950/5"
        style={{ zIndex: 1 }}
      >
        {mapReady && (
          <MapContainer 
            center={mapCenter} 
            zoom={16} 
            style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}
            zoomControl={false}
            className="grayscale-[0.2] dark:grayscale-[0.5] contrast-[1.1]"
          >
            <MapInvalidator />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {reports && reports.map((report) => (
              <Marker key={report.id} position={[report.lat, report.lng]}>
                <Popup className="premium-popup">
                  <div className="p-4 min-w-[200px]">
                    <span className={`bg-${report.color}-50 text-${report.color}-600 text-[10px] font-black px-3 py-1.5 rounded-lg mb-3 uppercase tracking-widest inline-block`}>
                      {report.type}
                    </span>
                    <h3 className="font-black text-blue-950 mb-2 text-lg leading-tight uppercase tracking-tight">{report.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">{report.desc || report.description}</p>
                    <div className="mt-4 pt-3 border-t border-gray-50 flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                       <MapPin className="w-3 h-3 mr-1 text-blue-600" /> {report.location || 'Katapatan Homes'}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        {/* Floating Controls */}
        <div className="absolute top-6 right-6 z-[1000] flex flex-col space-y-3">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onRefresh}
            disabled={isLoading}
            className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-gray-50 dark:border-slate-700 text-blue-600 dark:text-blue-400 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <RefreshCcw className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 left-6 z-[1000] bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-gray-50 dark:border-slate-700 hidden md:block">
           <h4 className="font-black text-blue-950 dark:text-white text-xs uppercase tracking-widest mb-4">Map Legend</h4>
           <div className="space-y-3">
              <div className="flex items-center space-x-3">
                 <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                 <span className="text-xs font-bold text-gray-600 dark:text-slate-300">Hazard / Danger</span>
              </div>
              <div className="flex items-center space-x-3">
                 <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                 <span className="text-xs font-bold text-gray-600 dark:text-slate-300">Theft / Crime</span>
              </div>
              <div className="flex items-center space-x-3">
                 <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                 <span className="text-xs font-bold text-gray-600 dark:text-slate-300">Other Reports</span>
              </div>
           </div>
        </div>

      </motion.div>
    </div>
  );
};

export default MapContent;
