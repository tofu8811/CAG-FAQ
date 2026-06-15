import { Category } from "../../types";
import { CoverIllustration } from "./CoverIllustration";

interface CoverPreset {
  id: string;
  label: string;
  desc: string;
  color: string;
}

interface PublishSettingsPanelProps {
  categories: Category[];
  selectedCategoryName: string;
  selectedCover: string;
  covers: CoverPreset[];
  featured: boolean;
  allowComments: boolean;
  isPublic: boolean;
  hashDigest: string;
  charCount: number;
  lastSaved: string;
  setSelectedCover: (cover: string) => void;
  setFeatured: (featured: boolean) => void;
  setAllowComments: (allowComments: boolean) => void;
  setIsPublic: (isPublic: boolean) => void;
  onSaveDraft: () => void;
  onCancel: () => void;
}

const ToggleRow = ({
  label,
  enabled,
  onToggle
}: {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}) => (
  <div className="flex items-center justify-between py-1">
    <span className="font-sans text-xs font-bold text-slate-700">{label}</span>
    <button
      type="button"
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        enabled ? "bg-blue-600" : "bg-slate-200"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  </div>
);

export const PublishSettingsPanel: React.FC<PublishSettingsPanelProps> = ({
  selectedCategoryName,
  selectedCover,
  covers,
  featured,
  allowComments,
  isPublic,
  hashDigest,
  charCount,
  lastSaved,
  setSelectedCover,
  setFeatured,
  setAllowComments,
  setIsPublic,
  onSaveDraft,
  onCancel
}) => {
  return (
    <aside className="lg:col-span-4 space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
        <h3 className="font-sans text-xs font-bold text-slate-500 uppercase tracking-widest">
          PUBLISH SETTINGS
        </h3>

        <div className="space-y-2">
          <label className="block font-sans text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            COVER IMAGE
          </label>
          <div className="border border-slate-100 rounded-lg p-2 bg-slate-50/20">
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-100/50 transition-all min-h-[148px] relative overflow-hidden group">
              <div className="absolute inset-0 bg-slate-950 opacity-0 pointer-events-none group-hover:opacity-5 transition-opacity" />
              <div className="absolute inset-0 z-0 pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity">
                <CoverIllustration styleId={selectedCover} categoryName={selectedCategoryName} />
              </div>

              <div className="z-10 flex flex-col items-center justify-center gap-2">
                <span className="p-2.5 bg-white/90 shadow-sm border border-slate-200/40 rounded-lg text-blue-600 block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera-plus">
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/>
                    <circle cx="12" cy="13" r="3"/>
                    <line x1="12" y1="10" x2="12" y2="16"/>
                    <line x1="9" y1="13" x2="15" y2="13"/>
                  </svg>
                </span>
                <span className="font-sans text-xs font-bold text-slate-700 leading-none">Click to upload cover image</span>
                <span className="font-sans text-[10px] text-slate-400 leading-none mt-1">Recommended: 1600x900px</span>
              </div>
            </div>

            <div className="mt-3.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5 items-center justify-between">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest pl-1">ART:</span>
              <div className="flex gap-1.5 flex-wrap">
                {covers.map(cov => (
                  <button
                    key={cov.id}
                    type="button"
                    onClick={() => setSelectedCover(cov.id)}
                    className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold border transition-all ${
                      selectedCover === cov.id
                        ? "bg-blue-50 text-blue-600 border-blue-200"
                        : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {cov.label.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <ToggleRow label="Is Featured Article" enabled={featured} onToggle={() => setFeatured(!featured)} />
          <ToggleRow label="Allow Comments" enabled={allowComments} onToggle={() => setAllowComments(!allowComments)} />
          <ToggleRow label="Public Visibility" enabled={isPublic} onToggle={() => setIsPublic(!isPublic)} />
        </div>

        <div className="space-y-3.5 pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold py-3.5 rounded-lg shadow-lg shadow-blue-500/15 transition-all flex items-center justify-center gap-2 active:scale-[0.98] select-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-white">
              <path d="M8 5v14l11-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Publish Now
          </button>

          <button
            type="button"
            onClick={onSaveDraft}
            className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-sans text-xs font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98] select-none"
          >
            Save as Draft
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="text-slate-500 hover:text-red-500 text-[10px] font-sans font-bold uppercase tracking-[0.15em] transition-all focus:outline-none"
            >
              DISCARD & CANCEL
            </button>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-5 space-y-2.5">
          <div className="flex items-center justify-between font-mono text-[9px] tracking-wider">
            <span className="text-slate-400 font-bold">STATUS:</span>
            <span className="text-red-600 font-extrabold uppercase bg-red-100 px-1.5 py-0.5 rounded border border-red-200/20">NEW POST</span>
          </div>
          <div className="flex items-center justify-between font-mono text-[9px] tracking-wider">
            <span className="text-slate-400 font-bold">REVISION:</span>
            <span className="text-slate-700 font-black">V1.0.0</span>
          </div>
          <div className="flex items-center justify-between font-mono text-[9px] tracking-wider">
            <span className="text-slate-400 font-bold">AUTHOR ID:</span>
            <span className="text-slate-700 font-black">TECH_772</span>
          </div>
        </div>
      </div>

      <details className="text-slate-400 bg-slate-900 border border-slate-800 rounded-xl p-3 select-none cursor-pointer">
        <summary className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">
          STAGING INTERNAL LOGS (DIAGNOSTICS_OK)
        </summary>
        <div className="space-y-1.5 font-mono text-[9px] text-slate-300 mt-2.5 pt-2 border-t border-slate-800">
          <div className="flex justify-between">
            <span>DRAFT_SHA256:</span>
            <span className="font-bold text-blue-400">{hashDigest}</span>
          </div>
          <div className="flex justify-between">
            <span>CHAR_DENSITY:</span>
            <span>{(charCount / 1024).toFixed(2)} KB ({charCount} bytes)</span>
          </div>
          <div className="flex justify-between">
            <span>BUFFER_CACHE:</span>
            <span className="text-amber-500">{lastSaved}</span>
          </div>
        </div>
      </details>
    </aside>
  );
};
