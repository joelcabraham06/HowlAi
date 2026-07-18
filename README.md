HowlAi (Campus Pilot)

Campus Pilot is an AI agent built on the Model Context Protocol (MCP) that
functions as an operational copilot for campus life — not a chatbot that
answers questions, but an agent that can actually check, decide, and act on
real campus systems.

This repository holds the widget layer for Campus Pilot: the rich,
interactive UI components that render inline when the AI agent calls a tool,
built with NitroStack's widget system.

What's in this repo

FileWhat it isWidgets EgManifest listing all registered widgets, their URIs, descriptions, tags, and example payloadsTime table cardsCompiled widget — displays a student's daily class timetablefaculty cardCompiled widget — shows faculty contact info, office hours, and locationCampus MapCompiled widget — interactive campus navigation (classrooms, labs, library, hostel, canteen)Study HubCompiled widget — course materials, lecture notes, and past papersCGPA CalculatorCompiled widget — calculates current CGPA and predicts the grades needed to hit a target

Each widget file (aside from the manifest) is a self-contained, pre-built
HTML/JS bundle produced by NitroStack's widget build step — this is what gets
rendered inline in chat when its corresponding MCP tool returns a result.

Widget catalog (from Widgets Eg)


/timetable-card — today's schedule with course, instructor, room, and time
/faculty-card — faculty lookup: office, office hours, specialization
/campus-map — navigable map with facility types and coordinates
/study-hub — study materials filtered by course code
/cgpa-planner — current CGPA + required grades to hit a target GPA


How this fits into the full Campus Pilot project

This repo covers the presentation layer only. The MCP server side — the
actual tools an AI agent calls (get_schedule, check_room_availability,
book_room, get_room_conditions, control_room_device, report_issue,
etc.) — lives in a separate NitroStack server project. That server is what
invokes these widgets via @Widget('...') decorators so the AI's tool
responses render as this rich UI instead of raw JSON.
