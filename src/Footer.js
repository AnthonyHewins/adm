import React from 'react';
import {Icon, Container, Divider} from 'semantic-ui-react';


export function Footer(props) {
  return <>
           <Divider />
           <Container>
             <p className='slimjoe'>
               Artifex de Machina
               &copy;
             </p>
           </Container>
         </>;
}
