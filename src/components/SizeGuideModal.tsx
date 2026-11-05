import React from 'react';
import { X, Ruler, CheckCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();

  if (!isSizeGuideOpen) return null;

  const sizeChart = [
    { uk: 'UK 4', eu: 'EU 37', usMen: 'US 4.5', usWomen: 'US 6', cm: '23.0 cm', inches: '9.06 in' },
    { uk: 'UK 5', eu: 'EU 38', usMen: 'US 5.5', usWomen: 'US 7', cm: '23.8 cm', inches: '9.37 in' },
    { uk: 'UK 6', eu: 'EU 39.5', usMen: 'US 6.5', usWomen: 'US 8', cm: '24.6 cm', inches: '9.68 in' },
    { uk: 'UK 7', eu: 'EU 41', usMen: 'US 7.5', usWomen: 'US 9', cm: '25.4 cm', inches: '10.0 in' },
    { uk: 'UK 8', eu: 'EU 42', usMen: 'US 8.5', usWomen: 'US 10', cm: '26.2 cm', inches: '10.3 in' },
    { uk: 'UK 9', eu: 'EU 43', usMen: 'US 9.5', usWomen: 'US 11', cm: '27.1 cm', inches: '10.6 in' },
    { uk: 'UK 10', eu: 'EU 44.5', usMen: 'US 10.5', usWomen: 'US 12', cm: '27.9 cm', inches: '11.0 in' },
    { uk: 'UK 11', eu: 'EU 46', usMen: 'US 11.5', usWomen: 'US 13', cm: '28.8 cm', inches: '11.3 in' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsSizeGuideOpen(false)}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded-full border border-zinc-800 transition-colors"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-display">Dravine Sizing Guide</h3>
            <p className="text-xs text-zinc-400">Standard Sri Lankan & International Footwear Measurements</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900 text-zinc-300 font-mono uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4 text-orange-400 font-bold">UK / Sri Lanka</th>
                <th className="py-3 px-4">EU</th>
                <th className="py-3 px-4">US Men</th>
                <th className="py-3 px-4">US Women</th>
                <th className="py-3 px-4">Foot Length (cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-mono text-zinc-300 tabular-nums">
              {sizeChart.map((row) => (
                <tr key={row.uk} className="hover:bg-zinc-900/40 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-white bg-orange-950/20">{row.uk}</td>
                  <td className="py-2.5 px-4">{row.eu}</td>
                  <td className="py-2.5 px-4">{row.usMen}</td>
                  <td className="py-2.5 px-4">{row.usWomen}</td>
                  <td className="py-2.5 px-4 text-orange-400">{row.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring Instructions */}
        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-2 text-xs text-zinc-300">
          <h4 className="font-semibold text-white flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-orange-500" />
            How to Measure Your Foot Length
          </h4>
          <ol className="list-decimal list-inside space-y-1 text-zinc-400 leading-relaxed">
            <li>Place a sheet of blank paper against a flat wall on a hard surface.</li>
            <li>Stand on the paper with your heel lightly pressing against the wall.</li>
            <li>Mark the furthest tip of your longest toe with a pencil perpendicular to the paper.</li>
            <li>Measure the distance from the edge of the paper to the marked point in centimeters.</li>
            <li>Compare with our chart above. If you fall between sizes, we recommend sizing up for athletic trainers and true to size for formal brogues.</li>
          </ol>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold rounded-xl text-xs uppercase tracking-wider border border-zinc-700 transition-colors"
          >
            Got It, Back to Product
          </button>
        </div>
      </div>
    </div>
  );
};
