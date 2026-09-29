import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

// Flowchart from [step, note] pairs: a row on desktop, a column on phones.
const Flow = ({ steps }) => (
    <ol className="flex flex-col md:flex-row md:items-stretch gap-1 md:gap-0" aria-label="Flow">
        {steps.map(([step, note], i) => (
            <li key={step} className="flex flex-col md:flex-row md:items-center md:flex-1 md:min-w-0">
                <div className="flex-1 rounded-lg border border-gray-700 bg-gray-800/60 px-3 py-2.5 md:h-full text-center">
                    <div className="text-sm font-semibold text-gray-100 leading-snug">{step}</div>
                    {note && <div className="mt-0.5 text-xs text-gray-400 leading-snug">{note}</div>}
                </div>
                {i < steps.length - 1 && (
                    <div className="flex justify-center py-1 md:py-0 md:px-1 text-yellow-500" aria-hidden="true">
                        <ArrowDown size={18} className="md:hidden" />
                        <ArrowRight size={18} className="hidden md:block" />
                    </div>
                )}
            </li>
        ))}
    </ol>
);

export default Flow;
