/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 *
 * @author Leandro Ordonez <leandro.ordonez.ante@gmail.com>
 */
public class SessionManager extends HttpServlet {

    /**
     * Processes requests for both HTTP
     * <code>GET</code> and
     * <code>POST</code> methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

//        PrintWriter out = response.getWriter();
//        try {
//            /* TODO output your page here. You may use following sample code. */
//            out.println("<!DOCTYPE html>");
//            out.println("<html>");
//            out.println("<head>");
//            out.println("<title>Servlet SessionManager</title>");            
//            out.println("</head>");
//            out.println("<body>");
//            out.println("<h1>Servlet SessionManager at " + request.getContextPath() + "</h1>");
//            out.println("</body>");
//            out.println("</html>");
//        } finally {            
//            out.close();
//        }
    }

    /**
     * Handles the HTTP
     * <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
//        processRequest(request, response);
        String userPath = request.getServletPath();
        HttpSession session = request.getSession();

        if (userPath.equals("/annotation")) {
            String userID = request.getParameter("user");
            System.out.println(request.getQueryString());
            System.out.println(userID);

            String url = "/WEB-INF/annotations/" + userID + ".json";

            try {
                request.getRequestDispatcher(url).forward(request, response);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }

    /**
     * Handles the HTTP
     * <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //processRequest(request, response);
        String userPath = request.getServletPath();
        HttpSession session = request.getSession();

        if (userPath.equals("/user")) {
            String userProfile = request.getParameter("userProfile");
            String userID = request.getParameter("userID");

            System.out.println(userID);
            System.out.println(userProfile);

            ServletContext servletContext = getServletContext();
            String webInfPath = servletContext.getRealPath("/WEB-INF/users/");

            try {
                File file = new File(webInfPath + "/" + userID + ".json");

                // if file doesnt exists, then create it
                if (!file.exists()) {
                    file.createNewFile();
                }

                FileWriter fw = new FileWriter(file.getAbsoluteFile());
                BufferedWriter bw = new BufferedWriter(fw);
                bw.write(userProfile);
                bw.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            // use RequestDispatcher to forward request internally
            String url = getServletContext().getContextPath() + "/browser.xhtml";

//        try {
//            request.getRequestDispatcher(url).forward(request, response);
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
        } else if (userPath.equals("/annotation")) {
            String userID = request.getQueryString();
            String annotationObject = request.getParameter("annotation");
            System.out.println(annotationObject);

            String annotationsPath = getServletContext().getRealPath("/WEB-INF/annotations/" + userID + ".json");
            File f = new File(annotationsPath);
            try {
                JSONParser parser = new JSONParser();
                JSONObject postedAnnotation = (JSONObject) parser.parse(annotationObject);
                String operation = (String) postedAnnotation.keySet().iterator().next();
                JSONArray annotation = (JSONArray) postedAnnotation.get(operation);

                JSONObject annotationsFile;
                if (f.exists() && !f.isDirectory()) {
                    annotationsFile = (JSONObject) parser.parse(new FileReader(annotationsPath));
                    annotationsFile.put(operation, annotation);
                } else {
                    f.createNewFile();
                    annotationsFile = postedAnnotation;
                }
                
                System.out.println(annotationsFile);

                FileWriter file = new FileWriter(f);
                file.write(annotationsFile.toJSONString());
                file.flush();
                file.close();

//                    String name = (String) annotationsFile.get("name");
//                    System.out.println(name);
//
//                    long age = (Long) annotationsFile.get("age");
//                    System.out.println(age);
//
//                    // loop array
//                    JSONArray msg = (JSONArray) annotationsFile.get("messages");
//                    Iterator<String> iterator = msg.iterator();
//                    while (iterator.hasNext()) {
//                        System.out.println(iterator.next());
//                    }

            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }
}
