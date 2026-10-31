import React, { useState } from "react";
import { X, Sparkles, ShieldCheck, Check, ArrowRight } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [claimed, setClaimed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setClaimed(true);
    setTimeout(() => {
      onSuccess(email);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white border-2 border-black rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-black hover:bg-neutral-100 transition-colors border border-transparent hover:border-neutral-300"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Claimed Success state */}
        {claimed ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-yellow-400 border-2 border-black text-black flex items-center justify-center mx-auto shadow-md animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-black">
              Account Created!
            </h3>
            <p className="text-xs text-neutral-700 font-medium">
              Welcome aboard, <span className="text-black font-bold font-mono">{email}</span>. Your account is ready for instant idea validation.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 border border-yellow-400 text-xs font-bold text-black shadow-xs">
                <Sparkles className="w-3.5 h-3.5 fill-yellow-400 text-black" />
                <span>Instant Free Access</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-black">
                {isSignUp ? "Start Validating Today" : "Welcome Back"}
              </h3>
              <p className="text-xs text-neutral-600 font-medium">
                {isSignUp ? "Create your free founder account with no credit card." : "Log in to view your saved validation reports."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-black">Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@startup.com"
                  className="w-full bg-neutral-50 border-2 border-black rounded-xl px-4 py-2.5 text-sm text-black placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-black">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-neutral-50 border-2 border-black rounded-xl px-4 py-2.5 text-sm text-black placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black font-extrabold text-xs transition-all shadow-md shadow-yellow-400/25 flex items-center justify-center gap-2 border-2 border-black hover:scale-[1.01]"
              >
                <Sparkles className="w-4 h-4 text-black fill-black" />
                <span>{isSignUp ? "Create Free Account & Start" : "Log In"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-black" />
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-neutral-700">
              {isSignUp ? (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="text-black hover:underline font-extrabold"
                  >
                    Log in
                  </button>
                </p>
              ) : (
                <p>
                  Need an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="text-black hover:underline font-extrabold"
                  >
                    Sign up for free
                  </button>
                </p>
              )}
            </div>

            <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-300 flex items-center justify-center gap-2 text-[11px] text-black font-medium">
              <ShieldCheck className="w-4 h-4 text-black shrink-0" />
              <span>Zero-training privacy: your ideas remain 100% confidential</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
