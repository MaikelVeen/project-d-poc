import React from 'react';
import {Layout} from '../Layout.js';
// import {Link} from  'react-router-dom';
import {QRScanner} from './QRScanner.js';
// import { 
//   Grid,
//   Segment,
//   Header,
//   Icon,
//   Button,
//   Divider,
//   Container
// } from 'semantic-ui-react'

export class Checkin extends React.Component {
  render() {
    return (
      <Layout>
        {/* <Grid>
          <Grid.Row columns={2} centered>
            <Grid.Column>
              <SegmentBox/>
            </Grid.Column>
            <Grid.Column>
              <QRScanner/>
            </Grid.Column>
          </Grid.Row>
        </Grid> */}
        <QRScanner/>
      </Layout>
    )
  }
}

// const SegmentBox = () => (
//   <Container fluid textAlign='center'>
//     <Segment placeholder>
//       <Header icon as ='h2'>
//         <Icon name='qrcode' />
//         QR-code scanner
//       </Header>
//       <p>
//         Scan the QR-code you received in your mail.
//       </p>
//       <Divider horizontal>Or</Divider>
//       <Link to='/lobby'>
//         <Button color='red' content='Go back' icon='undo' labelPosition='left' />
//       </Link>
//     </Segment>
//   </Container>
// )