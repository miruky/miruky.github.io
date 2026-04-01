import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'miruky contact page',
};

export default function ContactPage() {
  return <ContactClient />;
}
