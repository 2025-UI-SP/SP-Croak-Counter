import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

function Help() {
  return (
    <div className="container mt-4">
      <h2>Help</h2>
      <p className="lead">Put something here</p>
      <Accordion className="w-100">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Lorem Ipsum</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Lorem Ipsum</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis
            consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla
            sed consectetur. Vestibulum id ligula porta felis euismod semper.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Lorem Ipsum</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi leo
            risus, porta ac consectetur ac, vestibulum at eros. Curabitur blandit
            tempus porttitor. Donec sed odio dui. Nullam quis risus eget urna
            mollis ornare vel eu leo.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Lorem Ipsum</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed
            diam eget risus varius blandit sit amet non magna. Etiam porta sem
            malesuada magna mollis euismod. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Help;


