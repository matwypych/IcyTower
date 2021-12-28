/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class MazeSkeleton extends Skeleton
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(skeletonImage, centreX, centreY, updateStateMiliseconds)
    {
        super(skeletonImage, centreX, centreY, updateStateMiliseconds); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.WIDTH_OF_SKELETON_ON_CANVAS = 90; /* the width and height that the skeleton will take up on the canvas */
        this.HEIGHT_OF_SKELETON_ON_CANVAS = 90;

        this.centreX = centreX; /* set the start position of the skeleton in the maze */
        this.centreY = centreY;

        this.SKELETON_SPEED = 10; /* set the skeleton's speed */
        this.BOUNCE_SPEED_DEFUALT = 14; /* set the skeleton's deafult speed */
    }
}