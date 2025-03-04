// import { useEffect } from "react";
// import Button from "../components/ui/Button";
// import { BsStars } from "react-icons/bs";
// import { useSelector, useDispatch } from "react-redux";
// // import { AppDispatch } from "../redux/store";
// import { generateCourses, getUserCourses } from "../redux/slices/courseSlice";
// import { toast } from "react-hot-toast";
// // import Spinner from "../components/ui/Spinner";

// const Generate = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { user } = useSelector((state: any) => state.auth);
//   const { courses, loading, error } = useSelector((state: any) => state.courses);

//   useEffect(() => {
//     if (user?._id) {
//       dispatch(getUserCourses(user._id));
//     }
//   }, [dispatch, user?._id]);

//   const handleGeneratePath = async () => {
//     if (!user?._id) {
//       toast.error("Please login to generate learning path");
//       return;
//     }

//     try {
//       await dispatch(generateCourses({
//         userId: user._id,
//         careerPath: "frontend", // You might want to get this from user preferences
//         experienceLevel: "beginner",
//         learningPreference: "self-paced"
//       })).unwrap();
      
//       toast.success("Learning path generated successfully!");
//     } catch (error: any) {
//       toast.error(error || "Failed to generate learning path");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Spinner />
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="flex flex-col gap-14">
//         <div className="flex flex-col">
//           <h2 className="font-medium text-xl">
//             Hi {user?.firstName || "Clever U"}
//           </h2>
//           <h1 className="font-semibold text-2xl">Good Morning!</h1>
//         </div>

//         {courses.length > 0 ? (
//           <div className="bg-white rounded-3xl p-8 ml-36">
//             <h2 className="text-2xl font-semibold mb-6">Your Learning Path</h2>
//             <div className="space-y-6">
//               {courses.map((course: any, index: number) => (
//                 <div
//                   key={index}
//                   className="border rounded-lg p-6 hover:shadow-md transition-shadow"
//                 >
//                   <h3 className="text-xl font-medium mb-2">{course.title}</h3>
//                   <p className="text-gray-600 mb-4">{course.description}</p>
//                   <div className="flex gap-4 mb-4">
//                     <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                       {course.platform}
//                     </span>
//                     <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
//                       {course.difficulty}
//                     </span>
//                     <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
//                       {course.duration}
//                     </span>
//                   </div>
//                   <div className="flex gap-2">
//                     {course.tags.map((tag: string, tagIndex: number) => (
//                       <span
//                         key={tagIndex}
//                         className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                   <a
//                     href={course.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="mt-4 inline-block text-indigo-600 hover:text-indigo-800"
//                   >
//                     Start Learning →
//                   </a>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className="bg-white flex flex-col items-center gap-11 px-28 py-28 rounded-3xl ml-36">
//             <h1 className="text-3xl font-semibold">First Time on Platform?</h1>
//             <p className="text-sm max-w-md text-center">
//               Welcome! Now that you've completed your profile, you can start your
//               journey by creating your learning path.
//             </p>
//             <Button
//               text="Generate Learning Path"
//               icon={<BsStars className="w-5 h-5" />}
//               className="bg-primary px-16 py-4 rounded-xl text-white flex-row-reverse"
//               onClick={handleGeneratePath}
//               disabled={loading}
//             />
//           </div>
//         )}

//         {error && (
//           <div className="text-red-600 text-center mt-4">
//             {error}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Generate;
