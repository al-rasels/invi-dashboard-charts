import React from 'react';
import { Building2, ShieldCheck, Mail, Phone } from 'lucide-react';



export default function WelcomeCard({ stats, companyInfo, mainUrl }) {
  // Use data from companyInfo or fallback to defaults
  const companyName = companyInfo?.name || "INVI SOLUTIONS";
  const companyEmail = companyInfo?.email || "Ragory.com";
  const companyMobile = companyInfo?.mobile || "N/A";


  return (
    <div className="!p-5 md:!p-7 !rounded-3xl !w-full !bg-white !shadow-sm hover:!shadow-xl hover:!shadow-indigo-100/50 !transition-all !duration-500 !flex !flex-col md:!flex-row !justify-around !items-center !gap-5 md:!gap-8 !border !border-gray-100 !relative !overflow-hidden !m-0 !h-full">
      {/* Background decoration */}
      <div className="!absolute !top-0 !right-0 !w-56 !h-56 !bg-indigo-50 !rounded-full !-mr-28 !-mt-28 !blur-3xl !opacity-60"></div>
      <div className="!absolute !bottom-0 !left-0 !w-40 !h-40 !bg-violet-50 !rounded-full !-ml-20 !-mb-20 !blur-2xl !opacity-40"></div>

      {/* Left Content Section */}
      <div className="!relative !z-10 !flex !flex-col !justify-around !w-full md:!w-2/3 !gap-5 !h-full">
        {/* Company Header Section */}
        <div className="!space-y-4">
          {/* Logo & Company Name */}
          <div className="!flex !items-center !gap-4">
            <span className="!p-2.5 !bg-gradient-to-br !from-indigo-600 !to-violet-700 !rounded-xl !text-white !shadow-lg !ring-2 !ring-indigo-50 group hover:!rotate-6 !transition-transform">
              <Building2 size={32} strokeWidth={2.5} />
            </span>
            <span>
              <span className="!text-xl md:!text-2xl !font-black !text-gray-900 !tracking-tighter !leading-none !uppercase !block">
                {companyName}
              </span>
              <span className="!flex !items-center !gap-1.5 !mt-1">
                <ShieldCheck size={11} className="!text-emerald-500 -mt-4" />
                <p className="!text-[10px] !text-gray-400 !font-bold !tracking-wider !uppercase">Enterprise Verified</p>
              </span>
            </span>
          </div>

          {/* Welcome Message */}
          <div className="!space-y-1.5">
            <h2 className="!text-lg md:!text-xl !font-black !text-gray-800 !tracking-tight">
              Welcome back,{' '}
              <span className="!text-indigo-600 !relative">
                {companyInfo?.admin_name}!
                <span className="!absolute !-bottom-1 !left-0 !w-full !h-0.5 !bg-indigo-100 !rounded-full"></span>
              </span>
            </h2>

            {/* Contact Information */}
            <div className="!flex !flex-wrap !items-center !gap-3 md:!gap-4 !mt-1">
              <div className="!flex !items-center !gap-1.5 !text-gray-500 !text-[11px] !font-medium">
                <div className="!p-1 !bg-gray-50 !rounded-lg">
                  <Mail size={12} className="!text-indigo-500" />
                </div>
                <span className="!truncate !max-w-[150px] md:!max-w-none">{companyEmail}</span>
              </div>
              <div className="!flex !items-center !gap-1.5 !text-gray-500 !text-[11px] !font-medium">
                <div className="!p-1 !bg-gray-50 !rounded-lg">
                  <Phone size={12} className="!text-indigo-500" />
                </div>
                <span>{String(companyMobile).split('/')[0]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Section */}
        <div className="!space-y-1  !border-t !border-gray-100">
          <p className="!text-gray-400 !font-bold !text-[9px] !uppercase !tracking-wider">Total System Revenue</p>
          <div className="!flex !items-baseline !gap-1.5">
            <span className="!text-2xl md:!text-3xl lg:!text-4xl !font-black !text-indigo-600 !tracking-tighter">
              ৳ {new Intl.NumberFormat("en-BD").format(stats?.total_sell)}
            </span>
          </div>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="!relative group !z-10 !hidden lg:!flex !items-center !justify-center">
        <div className="!absolute !-inset-4 !bg-gradient-to-r !from-indigo-500 !to-purple-500 !rounded-full !blur-2xl !opacity-10 group-hover:!opacity-20 !transition !duration-700"></div>
        <img
          src={`${mainUrl}/assets/react/core/dashboard/card-advance-sale.png`}
          alt="Dashboard Illustration"
          className="!relative !w-32 md:!w-44 lg:!w-52 !object-contain !drop-shadow-xl !transition-all !duration-700 group-hover:!scale-105 group-hover:!-rotate-2"
        />
      </div>
    </div>
  );
}
