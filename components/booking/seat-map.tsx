'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

// En un futuro, esto vendría de la base de datos
const occupiedSeats = ['A3', 'C5', 'F8'];
const seatLayout = {
  rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  cols: 12,
};

export default function SeatMap({
  selectedSeats,
  onSeatSelect,
}: {
  selectedSeats: string[];
  onSeatSelect: (seatId: string) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-6 rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
      {/* Pantalla */}
      <div className="h-2 w-full max-w-md rounded-full bg-white shadow-[0_0_20px_5px] shadow-white/50"></div>
      <p className="text-sm font-bold text-white -mt-4">PANTALLA</p>

      {/* Asientos */}
      <div className="flex flex-col gap-2">
        {seatLayout.rows.map(row => (
          <div key={row} className="flex items-center gap-2">
            <span className="w-4 text-center text-xs font-semibold text-slate-400">{row}</span>
            <div className="flex gap-2">
              {Array.from({ length: seatLayout.cols }).map((_, colIndex) => {
                const seatId = `${row}${colIndex + 1}`;
                const isOccupied = occupiedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);

                return (
                  <button
                    key={seatId}
                    disabled={isOccupied}
                    onClick={() => onSeatSelect(seatId)}
                    className={cn(
                      'h-6 w-6 rounded-t-md text-xs font-bold transition-colors',
                      isOccupied && 'bg-slate-600 cursor-not-allowed',
                      isSelected && 'bg-amber-400 text-slate-900',
                      !isOccupied && !isSelected && 'bg-slate-700 hover:bg-slate-600 text-slate-400',
                    )}
                  >
                    {colIndex + 1}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Leyenda */}
      <div className="flex gap-4 text-xs text-slate-400 mt-4">
        <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-t-md bg-slate-700"></div>Disponible</div>
        <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-t-md bg-amber-400"></div>Seleccionado</div>
        <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-t-md bg-slate-600"></div>Ocupado</div>
      </div>
    </div>
  );
}
