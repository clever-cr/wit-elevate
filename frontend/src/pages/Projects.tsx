import { useState } from 'react';

import { 
  Search,
  Plus,
  Filter,
  Clock,
  Users,
  GitBranch,
  Star
} from 'lucide-react';
import { Card } from "../components/ui/Card";
import { Progress } from "../components/ui/Progress";
import { Badge } from "../components/ui/badge";
import { Link } from 'react-router-dom';


const projectsData = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Build a full-stack e-commerce platform with product catalog, cart, and payment integration.",
    team: [
      { id: 1, name: "John D.", role: "Frontend", avatar: "JD" },
      { id: 2, name: "Maria S.", role: "Backend", avatar: "MS" },
      { id: 3, name: "Alex K.", role: "UI/UX", avatar: "AK" }
    ],
    supervisor: {
      name: "Dr. Smith",
      avatar: "DS",
      rating: 4.8
    },
    status: "In Progress",
    progress: 65,
    deadline: "2024-03-15",
    techStack: ["React", "Node.js", "MongoDB"],
    repository:"jj"
  },
  // ... more projects
];

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  
  return (
  
      <div className="p-6">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your team projects and track progress
            </p>
          </div>
          
          
        </div>

        
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {['All', 'Active', 'Completed', 'Planning'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status.toLowerCase)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  filter === status.toLowerCase()
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/portal/projectDetails`}>
                <div className="p-6">
                  {/* Project Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {project.title}
                      </h3>
                      <Badge 
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 mr-1 fill-amber-400 stroke-amber-400" />
                      {project.supervisor.rating}
                    </div>
                  </div>

       
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

            
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>


                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {project.team.length}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {project.deadline}
                      </div>
                    </div>
                    {project.repository && (
                      <GitBranch className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>

  );
};

export default Projects;