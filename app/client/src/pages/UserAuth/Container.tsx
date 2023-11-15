import React from "react";

type ContainerProps = {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  disabledLoginForm?: boolean;
};

function Container(props: ContainerProps) {
  const { children, footer, subtitle, title } = props;
  const instanceName = process.env.REACT_APP_APPSMITH_INSTANCE_NAME;

  return (
    <div className="flex flex-col items-center gap-4 my-auto min-w-min">
      <div className="bg-white border border-t-4 border-[color:var(--ads-v2\-color-border)] border-t-[color:var(--ads-v2\-color-border-brand)] py-8 px-6 w-[min(400px,80%)] flex flex-col gap-6 t--login-container rounded-[var(--ads-v2\-border-radius)]">
        <h1 className="text-lg font-bold text-center">{instanceName}</h1>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-xl font-semibold text-center text-[color:var(--ads-v2\-color-fg-emphasis)]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base text-center text-[color:var(--ads-v2\-color-fg)]">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>

      <div className="bg-white border w-[min(400px,80%)]">{footer}</div>
    </div>
  );
}

export default Container;
