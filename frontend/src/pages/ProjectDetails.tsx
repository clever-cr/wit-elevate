import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  ArrowLeft,
  Calendar,
  GitBranch,
  MessageSquare,
  Star,
  FileText,
  CheckCircle2,
  Clock,
  Send,
  Link as LinkIcon
} from 'lucide-react';
import { Card } from "../components/ui/Card";
import { Avatar, AvatarFallback } from "../components/ui/Avatar";
import { Progress } from "../components/ui/Progress";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const ProjectDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [newComment, setNewComment] = useState('');
  
  // Mock project data
  const project = {
    id: 1,
    title: "E-commerce Platform",
    description: "Build a full-stack e-commerce platform with product catalog, cart, and payment integration. The system should include user authentication, product management, shopping cart functionality, and secure checkout process.",
    team: [
      { name: "John Doe", role: "Frontend Lead", avatar: "JD" },
      { name: "Maria Smith", role: "Backend Developer", avatar: "MS" },
      { name: "Alex Kim", role: "UI/UX Designer", avatar: "AK" }
    ],
    supervisor: { 
      name: "Dr. Smith", 
      avatar: "DS",
      rating: 4.8,
      feedback: "The team is making good progress. Keep up the good work!"
    },
    status: "In Progress",
    progress: 65,
    startDate: "2024-01-15",
    deadline: "2024-03-15",
    repository: "https://github.com/team/ecommerce-project",
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    milestones: [
      { 
        title: "Project Setup & Planning", 
        dueDate: "2024-01-30", 
        status: "Completed",
        deliverables: ["Project proposal", "Architecture diagram", "Tech stack documentation"]
      },
      { 
        title: "Frontend Implementation", 
        dueDate: "2024-02-15", 
        status: "Completed",
        deliverables: ["User interface", "Component library", "State management"]
      },
      { 
        title: "Backend API Development", 
        dueDate: "2024-02-28", 
        status: "In Progress",
        deliverables: ["API endpoints", "Database schema", "Authentication system"]
      },
      { 
        title: "Integration & Testing", 
        dueDate: "2024-03-10", 
        status: "Pending",
        deliverables: ["API integration", "Unit tests", "E2E tests"]
      }
    ],
    discussions: [
      { 
        author: "Dr. Smith",
        avatar: "DS",
        content: "Please make sure to implement proper error handling in the API endpoints.",
        date: "2024-02-10",
        type: "feedback"
      },
      { 
        author: "John Doe",
        avatar: "JD",
        content: "We've completed the user authentication system. Moving on to product management now.",
        date: "2024-02-08",
        type: "update"
      },
      { 
        author: "Maria Smith",
        avatar: "MS",
        content: "I've pushed the latest API changes to the repository. Please review when you have time.",
        date: "2024-02-05",
        type: "update"
      }
    ],
    documents: [
      {
        name: "Project Proposal.pdf",
        type: "pdf",
        size: "2.4 MB",
        uploadedBy: "John Doe",
        date: "2024-01-15"
      },
      {
        name: "API Documentation.md",
        type: "markdown",
        size: "156 KB",
        uploadedBy: "Maria Smith",
        date: "2024-02-01"
      }
    ]
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment('');
    }
  };
  
  return (
    
      <div className="min-h-screen bg-gray-50">
        {/* Project Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <Link 
              to="/portal/projects"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>

            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                  {project.title}
                </h1>
                <div className="flex items-center gap-4">
                  <Badge variant="info">{project.status}</Badge>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Due {project.deadline}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-amber-400 stroke-amber-400" />
                    {project.supervisor.rating}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  <GitBranch className="w-4 h-4 mr-2" />
                  Repository
                </button>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Discussion
                </button>
              </div>
            </div>

            {/* Project Navigation */}
            <div className="mt-8">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="milestones">Milestones</TabsTrigger>
                  <TabsTrigger value="discussions">Discussions</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Tabs defaultValue="overview">
            <TabsContent value="overview">
              <div className="grid grid-cols-3 gap-6">
                {/* Progress Card */}
                <Card className="col-span-2">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Project Progress
                    </h3>
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Overall Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <p className="text-gray-600 mb-6">
                      {project.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Important Links
                        </h4>
                        <div className="space-y-2">
                          <a 
                            href={project.repository}
                            className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                          >
                            <LinkIcon className="w-4 h-4 mr-2" />
                            GitHub Repository
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Team Card */}
                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Team Members
                    </h3>
                    <div className="space-y-4">
                      <div className="pb-4 border-b">
                        <div className="text-sm text-gray-500 mb-3">Supervisor</div>
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{project.supervisor.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {project.supervisor.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Project Supervisor
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500 mb-3">Team Members</div>
                        <div className="space-y-3">
                          {project.team.map((member) => (
                            <div key={member.name} className="flex items-center">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{member.avatar}</AvatarFallback>
                              </Avatar>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  {member.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {member.role}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Keep the existing TabsContent for milestones, discussions, and documents */}
          </Tabs>
        </div>
      </div>
  
  );
};

export default ProjectDetails;