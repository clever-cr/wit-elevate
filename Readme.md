# WIT elevate

WIT Elevate is An AI-driven platform that helps high school graduates start tech careers by recommending courses in UI/UX, frontend, and backend development. It fosters collaboration through discussions, expert feedback, and hands-on projects. The platform tracks progress, builds portfolios, and enhances job prospects, empowering women in tech.

## Getting started

- Clone down this repository https://github.com/clever-cr/wit-elevate . You will need `node` and `npm` installed globally on your machine.

## Installing project

- Use commmand `cd backend` to use backend folder, and `cd frontend` to use frontend folder


- You have to install Backend and Frontend separately. For this run `npm install` in the `backend` and the `frontend` folder.


- For `frontend` run `npm run dev` and `npm run start:dev `for backend

## Link to figma
- https://www.figma.com/design/8gHcRROuW9LGv4tvv9z1Xd/WIT-Elevate?node-id=313-1246&t=7qpmFOKVj2smuI26-1

## Deployement plan
### Development &  version control
- Writing codes using vscode
- Code is pushed to GitHub Repo for version cotrol
### CI/CD Pipeline setup
- Github actions triggers automated workflows.
### Containerization & Deployment
- The build artifact is pushed to DockerHub for containerization
- The application is auto-deployed to Render(backend) and Vercel(frontend)
### Continuous && Monitoring
- Each new code push triggers automatic builds & deployments.