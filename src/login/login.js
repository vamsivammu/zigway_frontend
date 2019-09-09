import React from 'react'
import axios from 'axios'
import {Container,Row,Col,Form,FormGroup,Label,Button,Input} from 'reactstrap'
export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            loading:false
        }
    }

    login = (e)=>{
        this.setState({
            loading:true
        })
        e.preventDefault()
        axios.post('http://localhost:8000/login/',{username:this.state.username,password:this.state.password},{headers:{'Content-Type':'application/json'}}).then(r=>{
            var res = r
            var data = res.data
            var stringified = JSON.stringify(data)
            localStorage.setItem('auth_token',stringified)
            alert("You have been successfully logged in")
            this.resetform()
            
        }).catch(e=>{
            var error = e
            console.log(error.response.data)
        })
    }
    resetform = ()=>{
        this.setState({
            username:'',
            password:'',
            loading:false
        })
    }
    changeusername = (e)=>{
        this.setState({
            username:e
        })
    }
    changepass = (e)=>{
        this.setState({
            password:e
        })
    }
    render(){
        return(
            <Container style={{alignItems:'center',justifyContent:'center'}}>
                <Row className="justify-content-center">
                    <Col className="registration-box" xs="10" sm="6" md="5" lg="4">
                        <h3 style={{textAlign:'center',marginTop:'15px',marginBottom:'15px'}}>Login</h3>
                        <Form onSubmit={(e)=>this.login(e)}>
                            <FormGroup>
                                <Label>Username:</Label>
                                <Input value={this.state.username} onChange={({nativeEvent})=>this.changeusername(nativeEvent.target.value)} required></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Password:</Label>
                                <Input type="password" value={this.state.password} onChange={({nativeEvent})=>this.changepass(nativeEvent.target.value)} required></Input>
                            </FormGroup>
                            <FormGroup style={{textAlign:'center'}}>
                                <Button disabled={this.state.loading} type="submit" >Login</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                    
                </Row>
            </Container>
        )
    }
}