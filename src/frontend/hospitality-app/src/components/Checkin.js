import React from 'react';
import {Layout} from '../Layout.js';
// import {Link} from  'react-router-dom';
import WebcamCapture from './WebcamCapture'
import { 
  Grid
} from 'semantic-ui-react'

export class Checkin extends React.Component {

  render() {
    return (
      <Layout>
        <Grid>
          <Grid.Row columns={2} centered>
            <Grid.Column>
              TODO: Scan QR code
            </Grid.Column>
            <Grid.Column>
              <WebcamCapture/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}