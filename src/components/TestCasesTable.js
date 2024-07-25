// import { useState, useEffect } from 'react'
// import axios from 'axios'

// export default function TestCasesTable() {
//     const [testCases, setTestCases] = useState([])
//     const [search, setSearch] = useState('')

//     useEffect(() => {
//         (async() => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/testCases')
//                 console.log(response.data, 'testCases')
//                 setTestCases(response.data)
//             } catch(err) {
//                 console.log(err)
//             }
//         })();
//     },[])

//     const handleStatusChange = async (id, newStatus) => {
//         const response = await axios.put(`http://localhost:5000/api/testcases/${id}`, { status: newStatus})
//         console.log(response.data, 'updated')
//         setTestCases(prevTestCases => 
//             prevTestCases.map(tc => 
//                 tc._id === id ? { ...tc, status: newStatus } : tc
//             )
//         )
//     }
//     const filteredTestCases = testCases.filter(testCase => 
//         testCase.name.toLowerCase().includes(search.toLowerCase())
//     );
//     return(
//         <div>
//             <h3>Test Cases</h3>

//             <input 
//                 type="text" 
//                 placeholder="Search issue.."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//             />
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Test Case Name</th>
//                         <th>Estimate Time</th>
//                         <th>Module</th>
//                         <th>Priority</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredTestCases.map((ele) => {
//                         return <tr key={ele._id}>
//                             <td>{ele.name}</td>
//                             <td>{ele.estimateTime}</td>
//                             <td>{ele.module}</td>
//                             <td>{ele.priority}</td>
//                             <td>
//                                 <select 
//                                     value={ele.status}
//                                     onChange={(e) => { 
//                                         handleStatusChange(ele._id, e.target.value)
//                                     }}  
//                                 >
//                                    <option value="select">select</option>
//                                    <option value="PASS">PASS</option>
//                                    <option value="FAIL">FAIL</option>

//                                 </select>
//                             </td>
//                         </tr>
//                     })}
//                 </tbody>
//             </table>
//         </div>
//     )
// } 


import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TestCasesTable() {
    const [testCases, setTestCases] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/testcases');
                console.log(response.data, 'testCases');
                setTestCases(response.data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        const response = await axios.put(`http://localhost:5000/api/testcases/${id}`, { status: newStatus });
        console.log(response.data, 'updated');
        setTestCases(prevTestCases =>
            prevTestCases.map(tc =>
                tc._id === id ? { ...tc, status: newStatus } : tc
            )
        );
    };

    const filteredTestCases = testCases.filter(testCase =>
        testCase.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <h3>Test Cases</h3>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={6}>
                    <Form.Control
                        type="text"
                        placeholder="Search issue.."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Test Case Name</th>
                        <th>Estimate Time</th>
                        <th>Module</th>
                        <th>Priority</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTestCases.map((ele) => (
                        <tr key={ele._id}>
                            <td>{ele.name}</td>
                            <td>{ele.estimateTime}</td>
                            <td>{ele.module}</td>
                            <td>{ele.priority}</td>
                            <td>
                                <Form.Control
                                    as="select"
                                    value={ele.status}
                                    onChange={(e) => handleStatusChange(ele._id, e.target.value)}
                                >
                                    <option value="select">select</option>
                                    <option value="PASS">PASS</option>
                                    <option value="FAIL">FAIL</option>
                                </Form.Control>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

