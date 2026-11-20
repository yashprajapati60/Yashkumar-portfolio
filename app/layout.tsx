import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yashkumar Prajapati | AI/ML Engineer',
  description: 'AI/ML Engineer building intelligent systems with machine learning, deep learning and generative AI.',
  openGraph: { title: 'Yashkumar Prajapati — AI/ML Engineer', description: 'Engineering intelligence. Building what’s next.', type: 'website' }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
