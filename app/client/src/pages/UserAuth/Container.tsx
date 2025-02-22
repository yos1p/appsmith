import React from "react";
import FooterLinks from "./FooterLinks";

type ContainerProps = {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  disabledLoginForm?: boolean;
};

function Container(props: ContainerProps) {
  const { children, footer, subtitle, title } = props;
  return (
    <div className="flex flex-col items-center gap-4 my-auto min-w-min">
      <div className="bg-white border border-t-4 border-t-[color:var(--ads-color-brand)] py-8 px-6 w-[min(400px,80%)] flex flex-col gap-6 t--login-container">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-xl font-semibold text-center">{title}</h1>
          {subtitle && <p className="text-base text-center">{subtitle}</p>}
        </div>
        {children}
      </div>

      <div className="bg-white border w-[min(400px,80%)]">
        {footer}
        <FooterLinks />
      </div>
    </div>
  );
}

export default Container;
