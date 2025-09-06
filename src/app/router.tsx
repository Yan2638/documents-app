import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login/Login";
import DocumentsPage from "@/pages/Documents/DocumentsPage";
import DocumentView from "@/pages/Documents/DocumentView";
import CreateDocument from "@/pages/Documents/CreateDocument";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/documents",
    element: <DocumentsPage />,
  },
  {
    path: "/documents/:id",
    element: <DocumentView />,
  },
  {
    path: "/documents/create",
    element: <CreateDocument />,
  }
]);
