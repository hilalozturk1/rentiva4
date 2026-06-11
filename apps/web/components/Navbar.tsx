'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');

    setIsLoggedIn(!!token);
    setUserRole(role);
  }, []);

  function handleLogout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('selectedBookingId');

    setIsLoggedIn(false);
    setUserRole(null);

    window.location.href = '/';
  }

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        Gesrent
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/vehicles" className="hover:text-blue-600">
          Araçlar
        </Link>

        {isLoggedIn ? (
          <>
            <Link href="/reservations" className="hover:text-blue-600">
              Rezervasyonlarım
            </Link>

            {(userRole === 'OWNER' || userRole === 'ADMIN') && (
              <Link href="/profile/vehicles" className="hover:text-blue-600">
                Araçlarım
              </Link>
            )}

            <Link href="/profile" className="hover:text-blue-600">
              Profilim
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Çıkış Yap
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-blue-600">
              Giriş Yap
            </Link>

            <Link
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Kayıt Ol
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}