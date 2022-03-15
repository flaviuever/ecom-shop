import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch, HashRouter} from 'react-router-dom'
import Nav from "./components/Nav";
import Promotions from "./components/Promotions";
import Category from "./components/Category";
import language from "./language";
import "./app.css";

const App = () => {

    const [selectedLanguage, setSelectedLanguage] = useState(language.english);

    return (
        
        <div className="container">
        <HashRouter>
            <Promotions selectedLanguage={selectedLanguage}/>
            <Nav selectedLanguage={selectedLanguage}/>
            <Switch>
                <Route path="/category/:categoryId">
                    <Category 
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                    />
                </Route>
                {/* <Route path="/category/">
                    <Category 
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                    /> 
                </Route> */}
                <Category 
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                /> 
            </Switch>
        </HashRouter>
        </div>

    )
};

export default App;
