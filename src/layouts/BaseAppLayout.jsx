import React from 'react';

const BaseAppLayout = ({ children }) => {
  // Rileva se lo schermo è troppo largo (tipico di un desktop)
  const isDesktop = window.innerWidth > 768;

  return (
    <div className="min-h-screen bg-white text-black">
      {isDesktop ? (
        <div className="flex items-center justify-center h-screen px-4 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Questa app è solo per mobile 📱</h1>
            <p className="text-gray-600">
              Per favore accedi da uno smartphone per utilizzare l'applicazione.
            </p>
          </div>
        </div>
      ) : (
        <main className="">{children}</main>
      )}
    </div>
  );
};

export default BaseAppLayout;