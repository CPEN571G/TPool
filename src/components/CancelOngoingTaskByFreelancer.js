import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import {Container, Form, FormControl, InputGroup} from "react-bootstrap";
import {ethers} from "ethers";

class CancelOngoingTaskByFreelancer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            contract: this.props.contract,
            currentAddress:this.props.currentAddress,
        }
        this.getBalance = this.getBalance.bind(this);
        this.cancelOngoingTask = this.cancelOngoingTask.bind(this);
    }

    componentDidMount() {
        this.getBalance();
    }

    async getBalance() {
        let that = this;
        this.state.contract.methods.balanceOfContract().call().then(function (balance) {
            let temp = window.web3.utils.fromWei(balance.toString(), 'ether');
            that.setState({balance: temp})
        });
    }

    cancelOngoingTask() {
        this.state.contract.methods.cancelOngoingTaskByFreelancer(this.state.taskId)
            .send({from: this.state.currentAddress})
            .on("error", (error) => {
                console.log(error);
                window.alert(error.message);
            }).on("receipt", (receipt) => {
            console.log(receipt);
            this.props.updateTask();
        });


    }

    render() {
        return <Container className="panel">
            <Form>
                <Form.Label>Cancel Ongoing Task By Freelancer</Form.Label>
                <Form.Group className="mb-3" >
                    <Form.Control value={this.state.taskId} placeholder="Enter Task ID You Want To Cancel" type="number" onChange={e => this.setState({taskId: e.target.value})}/>
                </Form.Group>

                <Button variant="primary" onClick={this.applyTask} required>
                    Cancel
                </Button>
            </Form>


        </Container>;
    }
}

export default CancelOngoingTaskByFreelancer;