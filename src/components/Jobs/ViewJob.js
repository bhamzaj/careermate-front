import React, { useState } from 'react';
import {Button, Modal, Col, Badge} from 'react-bootstrap';
import api, { endpoints } from '../../lib/api';

function ViewJob({ id }) {
    const [show, setShow] = useState(false);
    const [data, setData] = useState({});

    const fetchJob = async () => {
        const response = await api.call(endpoints.getOneJobById(id), {}, null);
        setData(response.results);
        setShow(true);
        console.log(data.applicants)
    }

    return (
        data&&
        <>
            <Button variant="primary" onClick={fetchJob}>
                View Job
            </Button>

            <Modal
                fullscreen={true}
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w">
                <Modal.Header closeButton>
                    <Modal.Title >
                        {data.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {data.category}
                    </p>
                    <Col md={{ span: 10, offset: 0 }}>
                        <blockquote className="blockquote mb-0">
                            <p>
                                {/* // limit description length to 95 chars */}
                                {data.description}
                               

                            </p>
                            <footer className="blockquote-footer">
                                {data.organization} <cite title={data.city}>{data.city}</cite> {' >    ' + data.views} views
                            </footer>
                        </blockquote>
                    </Col>
                    <Badge bg="primary">{data.applicants?.length}</Badge> people applied

                </Modal.Body>
            </Modal>
        </>
    );
}

export default ViewJob