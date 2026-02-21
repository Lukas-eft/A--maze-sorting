# A* Pathfinding Visualizer
### Developed by lukas-eft

A high-performance pathfinding visualizer built with vanilla JavaScript. This tool demonstrates the efficiency of the A* search algorithm through a clean, grid-based interface. The design focuses on a flat, matte aesthetic to match professional algorithm visualizers.
<img width="1918" height="993" alt="Screenshot 2026-02-21 225907" src="https://github.com/user-attachments/assets/cf7e5f7f-5cfa-46a5-9d36-711a627a76e1" />

## Project Overview

This application shows users how the A* algorithm navigates through obstacles to find the shortest path between two points.

## Technical Features

* **Interactive Grid:** A 20x20 node system supporting real-time wall placement via click-and-drag.
* **Algorithm Implementation:** A complete A* execution utilizing an open set for frontier nodes and a closed set for visited nodes.
* **Heuristic Optimization:** Manhattan distance calculation to guide the search towards the target efficiently.
* **Asynchronous Visualization:** Step-by-step rendering of the search process using JavaScript async/await and non-blocking delays.

## User Interface

The interface follows a specific design language:
* **Dark Mode:** Deep charcoal background (#1a1c1e) with card-based grouping.
* **Pill Buttons:** Highly rounded buttons (25px radius) for a modern feel.
* **Color Palette:** * Primary Action: Matte Green (#7ed37e)
    * Secondary Action: Medium Gray (#545b64)
    * Start Node: Muted Blue (#4a9eff)
    * Target Node: Muted Red (#ff4757)

## Logic and Formulas

The algorithm finds the optimal path by minimizing the following function:

$$f(n) = g(n) + h(n)$$

Where:
* $g(n)$ is the exact cost of the path from the starting point to node $n$.
* $h(n)$ is the heuristic estimated cost from node $n$ to the target.

## Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/Lukas-eft/A--maze-sorting.git](https://github.com/Lukas-eft/A--maze-sorting.git)
