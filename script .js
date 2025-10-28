import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.*;

public class ChatServlet extends HttpServlet {
    private static final List<String> messages = new ArrayList<>();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String message = request.getParameter("message");
        if (message != null && !message.trim().isEmpty()) {
            synchronized (messages) {
                messages.add("User: " + message);
            }
        }
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        synchronized (messages) {
            response.getWriter().write(messages.toString());
        }
    }
}