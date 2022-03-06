import { render, screen } from '@testing-library/react';
import App from 'App';
import LoginView from "views/LoginPage/LoginPage";
import {shallow} from 'enzyme'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import ProtectedRoute from "components/ProtectedRoute/protectedRoute";
import ProfilePage from "views/ProfilePage";

let wrapped;

beforeEach(() =>{
  wrapped =  shallow(<App/>);
})

it('check Router Setup', () => {
  expect(wrapped.find(Router).length).toEqual(1);
});

it('check Number Of Routes', () => {
  expect(wrapped.find(Route).length).toEqual(2);
});

it('check Profile Page in Protected Route', () => {
  expect(wrapped.find(ProtectedRoute).length).toEqual(1);
});
