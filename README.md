# Code challenge (WEB)

Author: Sergey Lushkovsky  
Live demo: [demo-10tf.lushkovsky.com](http://demo-10tf.lushkovsky.com)  

## How to run

1. `yarn install` or `npm install`
1.  One of the options based on that do you need:
    * `yarn start` or `npm run start` to start the app on [localhost:3000](http://localhost:3000)
    * `yarn build` or `npm run build` to build the static version of the app (to build/ folder)
    * `yarn build-with-zip` or `npm run build-with-zip` to build and zip the static version of the app (build/ and build.zip would be created)

## Technical summary

Framework: React (create-react-app + react-app-rewired)  
Routing: react-router-dom  
State management: MobX  
Netowrking package: axios  

## QA

* **Why no semicolons**  
    As all the code passes through the babel no way missed semicolon will lead to any bad consequences (like bugs after minification)
* **Why to use dangerouslySetInnerHTML? Is it really dangerous?**  
    Basically, dangerouslySetInnerHTML is a way to render encoded html inside dom element. It's dangerous because in case of any fraud on the server or between the server and client it could cause negative consequences e.g. some malicious form or ads will be rendered to the user. In practice, as we requesting the server through https (with ssl) - MITM attack is very unlikely. The only weak place is our server.  
    The best solution would be to not using html encoding at all (remove it on the backend).
* **What is react-app-rewired and why it has used?**    
    react-app-rewired is an alternative runner for create-react-app project which allows us to add some extras to the webpack config without the eject.  
    In our case, we're using it to add decorators support.
* **Why MobX (not redux)?**  
    This particular task doesn't require reducers in state management (even in case of scale). As so, MobX is a way cleaner and easier approach.
* **Why not to use function components?**  
    Basically, there is no big difference between function- and class-based components. I think that it's more codestyle question and as so, my personal choice is class-based components. 
* **Why TS haven't used?**  
    In the scope of this task, I see it as an overhead. But there is no problem to migrate to TS for this project (and me).
* **How was the live demo done?**     
    The project has been built using the "build-with-zip" command. The build.zip have been transferred to a Digital Ocean vps (using scp) and then unpacked to its folder. Afterward, cloudflare (dns) and nginx (webserver) have been configured to serve this static folder on the domain requests. 