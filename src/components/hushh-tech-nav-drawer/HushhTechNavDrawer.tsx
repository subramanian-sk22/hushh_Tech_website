/**
 * HushhTechNavDrawer — Full-screen navigation drawer (Revamped)
 * Apple iOS colors, proper English capitalization, hushh-blue accents.
 * Slides in from right, covers entire viewport.
 */
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import hushhLogo from "../images/Hushhogo.png";
import { useAuthSession } from "../../auth/AuthSessionProvider";
import { useModalKeyboardNavigation } from "../../hooks/useModalKeyboardNavigation";
import { moveFocusWithin } from "../../utils/keyboardNavigation";

interface NavItem {
  icon: string;
  label: string;
  path: string;
  highlight?: boolean;
  subtitle?: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: "home", label: "Home", path: "/" },
  { icon: "menu_book", label: "Our Philosophy", path: "/philosophy" },
  { icon: "pie_chart", label: "Fund A", path: "/discover-fund-a" },
  { icon: "groups", label: "Community", path: "/community" },
  { icon: "verified_user", label: "KYC Studio Alpha", path: "/kyc" },
];

const HIGHLIGHT_ITEM: NavItem = {
  icon: "lock",
  label: "Unlock 300K Coins",
  subtitle: "$1 or use coupon code",
  path: "/unlock-coins",
  highlight: true,
};

const BOTTOM_NAV: NavItem[] = [
  { icon: "mail", label: "Contact", path: "/contact" },
  { icon: "help", label: "FAQ", path: "/faq" },
];

interface HushhTechNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const HushhTechNavDrawer: React.FC<HushhTechNavDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { status, signOut } = useAuthSession();
  const isAuthenticated = status === "authenticated";
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useModalKeyboardNavigation({
    isOpen,
    containerRef: drawerRef,
    initialFocusRef: closeButtonRef,
    onClose,
  });

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleLogout = async () => {
    onClose();
    await signOut();
    navigate("/login");
  };

  const handleDrawerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    moveFocusWithin(drawerRef.current, event);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-end bg-black/45 px-3 pb-3 pt-20 selection:bg-hushh-blue selection:text-white backdrop-blur-[1px] md:px-6 md:pb-6 md:pt-24"
      onClick={onClose}
    >
      <div
        ref={drawerRef}
        className="flex max-h-[calc(100vh-5.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/70 bg-white shadow-2xl animate-scaleIn md:max-h-[calc(100vh-7.5rem)] dark:border-slate-700 dark:bg-slate-950"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hushh-nav-drawer-title"
        tabIndex={-1}
        onKeyDown={handleDrawerKeyDown}
        onClick={(event) => event.stopPropagation()}
      >
      {/* ── Header ── */}
      <div className="px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-gray-200 dark:border-slate-700">
            <img src={hushhLogo} alt="Hushh" className="w-5 h-5 object-contain" />
          </div>
          <span
            id="hushh-nav-drawer-title"
            className="pt-0.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gray-900 dark:text-white"
          >
            hushh technologies
          </span>
        </div>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hushh-blue focus-visible:ring-offset-2 dark:border-slate-700 dark:hover:bg-slate-900"
          aria-label="Close menu"
        >
          <span className="material-symbols-outlined text-gray-500 !text-[1.2rem] dark:text-slate-400">
            close
          </span>
        </button>
      </div>

      {/* ── Nav Links ── */}
      <div className="flex-1 px-5 md:px-6 pt-2 pb-6 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-1">
          {/* Main nav items */}
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className="group flex w-full items-center gap-3 rounded-xl border border-gray-100 bg-white px-3 py-3 text-left transition-colors hover:border-hushh-blue/20 hover:bg-hushh-blue/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-400/30 dark:hover:bg-blue-500/10"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-transparent bg-gray-50 transition-all group-hover:border-hushh-blue/20 group-hover:bg-hushh-blue/10 dark:bg-slate-800">
                  <span className="material-symbols-outlined text-gray-400 transition-colors !text-[1rem] group-hover:text-hushh-blue dark:text-slate-400">
                    {item.icon}
                  </span>
                </div>
                <span className="text-[0.9rem] font-medium leading-tight tracking-wide text-gray-900 transition-colors group-hover:text-hushh-blue dark:text-slate-100">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Highlight card — unlock coins */}
          <button
            onClick={() => handleNavigate(HIGHLIGHT_ITEM.path)}
            className="group my-3 flex w-full items-center gap-4 rounded-xl border border-hushh-blue/20 bg-hushh-blue/5 px-3 py-3.5 text-left transition-colors hover:bg-hushh-blue/10 dark:bg-blue-500/10 dark:hover:bg-blue-500/15"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-hushh-blue/20 bg-white dark:bg-slate-900">
              <span className="material-symbols-outlined text-hushh-blue !text-[1rem]">
                {HIGHLIGHT_ITEM.icon}
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[0.95rem] font-semibold tracking-wide text-gray-900 dark:text-slate-100">
                {HIGHLIGHT_ITEM.label}
              </span>
              <span className="mt-0.5 text-[0.7rem] font-medium text-gray-500 dark:text-slate-400">
                {HIGHLIGHT_ITEM.subtitle}
              </span>
            </div>
            <span className="ml-auto material-symbols-outlined text-hushh-blue/40 !text-[1rem]">
              arrow_forward
            </span>
          </button>

          {/* Bottom nav items */}
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {BOTTOM_NAV.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className="group flex w-full items-center gap-3 rounded-xl border border-gray-100 bg-white px-3 py-3 text-left transition-colors hover:border-hushh-blue/20 hover:bg-hushh-blue/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-400/30 dark:hover:bg-blue-500/10"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-transparent bg-gray-50 transition-all group-hover:border-hushh-blue/20 group-hover:bg-hushh-blue/10 dark:bg-slate-800">
                  <span className="material-symbols-outlined text-gray-400 transition-colors !text-[1rem] group-hover:text-hushh-blue dark:text-slate-400">
                    {item.icon}
                  </span>
                </div>
                <span className="text-[0.9rem] font-medium tracking-wide text-gray-900 transition-colors group-hover:text-hushh-blue dark:text-slate-100">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Footer section ── */}
        <div className="mt-12 space-y-6 border-t border-gray-100 pt-8 dark:border-slate-800">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => handleNavigate("/hushh-user-profile")}
                className="flex items-center gap-5 group w-full text-left"
              >
                <div className="w-8 h-8 rounded-full bg-hushh-blue text-white flex items-center justify-center">
                  <span className="material-symbols-outlined !text-[1.1rem]">person</span>
                </div>
                <span className="text-[0.95rem] font-medium tracking-wide text-gray-900 transition-colors group-hover:text-hushh-blue dark:text-slate-100">
                  View Profile
                </span>
              </button>

              <div className="flex flex-col gap-4 pl-[3.25rem]">
                <button
                  onClick={() => void handleLogout()}
                  className="text-left text-[0.85rem] font-medium tracking-wide text-gray-500 transition-colors hover:text-red-500 dark:text-slate-400"
                >
                  Log Out
                </button>
                <button
                  onClick={() => handleNavigate("/delete-account")}
                  className="text-left text-[0.85rem] font-medium tracking-wide text-gray-400 transition-colors hover:text-red-500 dark:text-slate-500"
                >
                  Delete Account
                </button>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <button
                onClick={() => handleNavigate("/login")}
                className="group flex w-full items-center gap-3 rounded-xl border border-gray-100 bg-white px-3 py-3 text-left transition-colors hover:border-hushh-blue/20 hover:bg-hushh-blue/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-400/30 dark:hover:bg-blue-500/10"
              >
                <span className="material-symbols-outlined text-gray-400 transition-colors !text-[1rem] group-hover:text-hushh-blue dark:text-slate-400">
                  login
                </span>
                <span className="text-[0.9rem] font-medium tracking-wide text-gray-900 transition-colors group-hover:text-hushh-blue dark:text-slate-100">
                  Log In
                </span>
              </button>
              <button
                onClick={() => handleNavigate("/signup")}
                className="group flex w-full items-center gap-3 rounded-xl border border-gray-100 bg-white px-3 py-3 text-left transition-colors hover:border-hushh-blue/20 hover:bg-hushh-blue/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-400/30 dark:hover:bg-blue-500/10"
              >
                <span className="material-symbols-outlined text-gray-400 transition-colors !text-[1rem] group-hover:text-hushh-blue dark:text-slate-400">
                  person_add
                </span>
                <span className="text-[0.9rem] font-medium tracking-wide text-gray-900 transition-colors group-hover:text-hushh-blue dark:text-slate-100">
                  Sign Up
                </span>
              </button>
            </div>
          )}

          {/* Decorative bar */}
          <div className="flex items-center gap-2 pl-[3.25rem] pt-4 opacity-50 grayscale">
            <div className="h-3 w-8 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="h-3 w-3 rounded-full bg-gray-200 dark:bg-slate-700" />
            <div className="h-3 w-6 rounded bg-gray-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default HushhTechNavDrawer;
