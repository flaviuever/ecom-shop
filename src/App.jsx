import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import { useState } from "react";
import { Route, Switch, HashRouter} from 'react-router-dom'
import Nav from "./components/Nav";
import Promotions from "./components/Promotions";
import Category from "./components/Category";
import Language from "./components/Language";
import language from "./language";
// import LanguageContextProvider from './context/languageContext';
// import { languageContext } from './context/languageContext';

import "./app.css"

const App = () => {

    const [selectedLanguage, setSelectedLanguage] = useState(language.english);

    // const language = useContext(languageContext);
    // console.log(language);
    return (
        
        <div className="container">
        <HashRouter>
            <Nav selectedLanguage={selectedLanguage}/>
            <Language 
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            />
            
            <Switch>
                <Route path="/category/:categoryId">
                    <Category 
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                    />
                </Route>
                <Route path="/" exact component={Promotions} />
            </Switch>
        </HashRouter>
        </div>

    )
};

export default App;
