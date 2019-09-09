import React from 'react'
import axios from 'axios'
import {Row,Col,Container,FormGroup,Form,Label,Input,Button,Link} from 'reactstrap'
export default class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            email:'',
            password:'',
            loading:false
        }
    }
    register = (e)=>{
        e.preventDefault()
        this.setState({
            loading:true
        })
        console.log(this.state.username,this.state.password)
            axios.post('http://localhost:8000/register/',{username:this.state.username,password:this.state.password},{headers:{'Content-Type':'application/json'}}).then(r=>{
                alert('You have been successfully registered')
                window.location.pathname= '/login' // or push the path into history prop
                this.resetform()
                }).catch((e)=>{
                    var error = e
                    this.resetform()
                    if(error.response){
                        if(error.response.data[0]==="UNIQUE constraint failed: auth_user.username"){
                            alert("Username is already in use.")
                        }
                    }else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
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
                        <h3 style={{textAlign:'center',marginTop:'15px',marginBottom:'15px'}}>Register</h3>
                        <Form onSubmit={(e)=>this.register(e)}>
                            <FormGroup>
                                <Label>Username:</Label>
                                <Input value={this.state.username} onChange={({nativeEvent})=>this.changeusername(nativeEvent.target.value)} required></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Password:</Label>
                                <Input type="password" value={this.state.password} onChange={({nativeEvent})=>this.changepass(nativeEvent.target.value)} required></Input>
                            </FormGroup>
                            <FormGroup style={{textAlign:'center'}}>
                                <Button disabled={this.state.loading} type="submit" >Register</Button>        
                            </FormGroup>

                        </Form>
                    </Col>
                    
                </Row>
            </Container>
        )
    }
}