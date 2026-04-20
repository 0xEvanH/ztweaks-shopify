import {Await} from 'react-router';
import {Suspense} from 'react';
import {useRouteLoaderData} from 'react-router';
import Navbar from '~/components/ztweaks/Navbar';
import Footer from '~/components/ztweaks/Footer';
import SceneBackground from '~/components/ztweaks/SceneBackground';
import CustomCursor from '~/components/ztweaks/CustomCursor';

export function PageLayout({children}: any) {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{background: '#050505'}}>
      <CustomCursor />
      <SceneBackground />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
  