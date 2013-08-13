TODO LIST
    - Vector should extend Point and be constructable from a Point.
    - Make sure Polygon is using Vector only when absolutely required (possibly never).
    - Add simple\common transforms to Matrix.
    - Test transforming a Polygon with a Matrix.
    - Evaluate need to replace trig functions in Vector with approximate lookups.
    - Change non-constructor modules to start with a lowercase letter.
    - Actors need a z-index.
    - Actor.update and Actor.init need access to the ActorManager.
    - JAVADOC ALL THE THINGS!



FUNCTIONAL NOTES
    - Implement and test everything in 2D now... remember to leave everything flexible for another dimension later.

    An Actor
        - has a Matrix.
        - has a bounding box, polygon or circle.... this enough?
        - has a content drawing routine the assumes the actor is drawn from the origin of the stage context.

    To Draw an Actor...
        - I apply the matrix to each point in the bounding box and (optionally) draw them to the stage context with an identity matrix.
        - I apply the actors Matrix to the context and render the actor context.

    Motion and Physics!
        - Actors have a vector (2 components), velocity (first derivative) and acceleration (second derivative).
        - The vector is updated on each tick by the velocity.
        - The velocity is updated on each tick by the acceleration.
        - Actors have a transformation matrix.
        - The transformation matrix is updated on each tick by the size of the vector.



RESOURCES
    GENERAL MATH REFERENCE
    http://chortle.ccsu.edu/VectorLessons/vectorIndex.html#15
    http://www.math.oregonstate.edu/home/programs/undergrad/CalculusQuestStudyGuides/vcalc/vcalc.html

    DISTANCE FORMULA
    http://www.purplemath.com/modules/distform.htm

    SEPARATING AXIS THEOREM
    http://www.codezealot.org/archives/55#sat-convex
    http://rocketmandevelopment.com/blog/separation-of-axis-theorem-for-collision-detection/

    COLLISION PHYSICS
    http://www.metanetsoftware.com/technique/tutorialA.html

    CALCULATORS
    http://www.mathsisfun.com/algebra/matrix-calculator.html
    http://www.mathsisfun.com/algebra/vector-calculator.html