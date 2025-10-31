import { Home, Grid3x3, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartItemCount?: number;
}

export default function BottomNav({ activeTab, onTabChange, cartItemCount = 0 }: BottomNavProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'categories', label: 'Menu', icon: Grid3x3 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const navRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 375, height: 100 });
  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);

  useEffect(() => {
    const updateDimensions = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: 100 });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate position for active tab
  const tabWidth = dimensions.width / tabs.length;
  const activeCenter = (activeIndex + 0.5) * tabWidth;

  // Create SVG path for curved notch
  const createPath = () => {
    const curveWidth = 100; // Width of the curved notch
    const curveDepth = 35; // How deep the curve goes
    const topOffset = 35; // Where the curve starts from top - increased to accommodate button
    
    const startX = activeCenter - curveWidth / 2;
    const endX = activeCenter + curveWidth / 2;
    
    // Path that creates a smooth curve
    return `
      M 0,${topOffset}
      L ${startX},${topOffset}
      C ${startX + 20},${topOffset} ${startX + 25},${topOffset + curveDepth} ${activeCenter},${topOffset + curveDepth}
      C ${endX - 25},${topOffset + curveDepth} ${endX - 20},${topOffset} ${endX},${topOffset}
      L ${dimensions.width},${topOffset}
      L ${dimensions.width},${dimensions.height}
      L 0,${dimensions.height}
      Z
    `;
  };

  return (
    <nav ref={navRef} className="fixed bottom-0 left-0 right-0 z-40 md:hidden" data-testid="nav-bottom">
      <div className="relative" style={{ height: '100px' }}>
        {/* SVG for curved background */}
        <svg 
          className="absolute bottom-0 left-0 w-full"
          width={dimensions.width}
          height={dimensions.height}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="none"
        >
          <path
            d={createPath()}
            fill="hsl(var(--primary))"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
          />
        </svg>

        {/* Active tab floating button */}
        {activeIndex >= 0 && (
          <div 
            className="absolute transition-all duration-300"
            style={{ 
              left: `${activeCenter}px`,
              top: '25px', // Positioned lower to stay within footer
              transform: 'translateX(-50%)'
            }}
          >
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center" 
                 style={{ 
                   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25), 0 2px 10px rgba(0, 0, 0, 0.15)' 
                 }}>
              {(() => {
                const Icon = tabs[activeIndex].icon;
                return <Icon className="w-7 h-7 text-primary" />;
              })()}
            </div>
          </div>
        )}

        {/* Navigation items */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around px-4" style={{ height: '65px' }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 flex-1 transition-all py-2",
                  isActive ? "opacity-0 pointer-events-none" : "opacity-100"
                )}
                data-testid={`button-nav-${tab.id}`}
              >
                <Icon className="w-6 h-6 text-white/90" />
                <span className="text-sm font-medium text-white/90" data-testid={`text-nav-${tab.id}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}