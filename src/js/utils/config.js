/**
 * ID counter for object's generator.
 * @type {number}
 */
var elementCounter = 0;
/**
 * Start number of lifes.
 * @type {number}
 */
var defaultLifes = 3;
/**
 * Default timer delay, sec.
 * @type {number}
 */
var defaultTimer = 60;
/**
 * Max ball quantity per throw.
 * @type {number}
 */
var maxBalls = 5;

var BallType = {
    KILLER: "rem_life",
    EXTRA_TIME: "add_time",
    EXTRA_LIFE: "add_life",
    TYPE_1: "value_1",
    TYPE_2: "value_2",
    TYPE_3: "value_3",
    TYPE_4: "value_4",
    TYPE_5: "value_5"
};
