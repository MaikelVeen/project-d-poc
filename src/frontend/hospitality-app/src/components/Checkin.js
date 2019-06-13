import React from 'react';
import { Layout } from '../Layout.js';
import { QRScanner } from './QRScanner.js';

export class Checkin extends React.Component {
  render() {
    return (
      <Layout>
        <QRScanner />
      </Layout>
    );
  }
}
