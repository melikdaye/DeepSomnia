import React from "react";
import LoginView from "views/LoginPage/LoginPage";
import {mount} from 'enzyme';

let wrapped;
beforeEach(()=>{
    wrapped = mount(<LoginView/>);
})

afterEach(()=>{
    wrapped.unmount();
})

it('has a form',()=>{
    expect(wrapped.find("form").length).toEqual(1);
})

it('has input areas',()=>{
    expect(wrapped.find("CustomInput").length).toEqual(2);
})

it('email area can be typed in',()=>{
    let mailInput = wrapped.find('#email').hostNodes();
    expect(mailInput.length).toEqual(1);
    mailInput.simulate("change",{
        target : {value : "joedoe@mail.com"}
    });
    wrapped.update();
    expect(wrapped.find('#email').hostNodes().prop("value")).toEqual("joedoe@mail.com");
})

it('password area can be typed in',()=>{
    let passwInput = wrapped.find('#pass').hostNodes();
    expect(passwInput.length).toEqual(1);
    passwInput.simulate("change",{
        target : {value : "123test123"}
    });
    wrapped.update();
    expect(wrapped.find('#pass').hostNodes().prop("value")).toEqual("123test123");
})

it('valid user login',()=>{
    let mailInput = wrapped.find('#email').hostNodes();
    let passwInput = wrapped.find('#pass').hostNodes();
    mailInput.simulate("change",{
        target : {value : "mel2@mail.com"}
    });
    passwInput.simulate("change",{
        target : {value : "mardinli"}
    });
    wrapped.update();
    wrapped.find("form").simulate('submit');
    wrapped.update();
    expect(wrapped.find('#email').hostNodes().prop("value")).toEqual("");
    expect(wrapped.find('#pass').hostNodes().prop("value")).toEqual("");
})

