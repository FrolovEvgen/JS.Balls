/**
 * Объект конфигурации и управления игровым приложением.
 * @returns {Game}
 */
function createGame() {
    /**
     * @typedef {object} Game - Game application.
     */

    return {
        // Game field component.
        _canvas: null,

        // Header component
        _header: null,

        // Start game component.
        _startBlock: null,

        // End game component.
        _endBlock: null,

        // Game started.
        _gameStarted: false,

        // Timer function's id.
        _timerId: null,

        // Component's id.
        _id: "app",

        // Component's html element.
        _el: null,

        // Parent's html element.
        _parentEl: document.body,

        // Rendered flag.
        _rendered: false,

        /**
         * Initiate component.
         */
        init: function() {
            this.renderTo(document.body);

            // Create component's element.
            this._el = createEl("div");
            this._el.id = this._id;

            // Create and init 'Game Field' component.
            this._canvas = createCanvas();
            this.initCanvas();

            // Create and init 'Header' component.
            this._header = createHeader();
            this.initHeader();

            // Create and init 'Start Game' component.
            this._startBlock = createStartBlock();
            this.initStartBlock();

            // Create and init 'End Game' component.
            this._endBlock = createEndBlock();
            this.initEndBlock();
        },

        /**
         * Initiate 'Game Field' component.
         * @private
         */
        initCanvas: function(){
            var self, canvas;
            // Handle itself.
            self = this;

            // Get component.
            canvas = this.getCanvas();
            canvas.renderTo(this.getEl());

            // Add listener to deleting ball.
            canvas.onStartDelete = function(ball, event) {
                self.onBallDelete(ball, event);
            };

            // Init component.
            canvas.init();
        },

        /**
         * Initiate 'Header' component.
         * @private
         */
        initHeader: function(){
            // Get component.
            var header = this.getHeader();
            header.renderTo(this.getEl());

            // Init component.
            header.init();
        },

        /**
         * Initiate 'Start Game' component.
         * @private
         */
        initStartBlock: function(){
            var self, startBlock;
            // Handle itself.
            self = this;

            // Get component.
            startBlock = this.getStartBlock();
            startBlock.renderTo(this.getEl());

            // Add listener to click on 'Start' button.
            startBlock.onStartButtonClick = function() {
                self.onStartButtonClick();
            };

            // Init component.
            startBlock.init();
        },

        /**
         * Initiate 'End Game' component.
         * @private
         */
        initEndBlock: function(){
            // Get element.
            var endBlock = this.getEndBlock();
            endBlock.renderTo(this.getEl());
            // Init it.
            endBlock.init();
            // Set up button handlers.
            endBlock.onButtonClick(this.onRestartButtonClick, this);
        },

        /**
         * Get ID.
         * @returns {string} - Component's id.
         */
        getId: function() {
            return this._id;
        },

        /**
         * Get component's HTML element.
         * @returns {HTMLElement} - Components element.
         */
        getEl: function() {
            return this._el;
        },

        /**
         * Get parent's HTML element.
         * @returns {HTMLElement} - Components element.
         */
        getParentEl: function() {
            return this._parentEl;
        },

        /**
         * Set HTML element where we render this component.
         * @param {HTMLElement} htmlEl - Parent's HTML element.
         */
        renderTo: function(htmlEl) {
            this._parentEl = htmlEl;
        },

        /**
         * Get 'Game Field' component.
         * @returns {Canvas} - Component.
         */
        getCanvas: function() {
            return this._canvas;
        },

        /**
         * Get 'Header' component.
         * @returns {Header} - Component.
         */
        getHeader: function() {
            return this._header;
        },

        /**
         * Get 'Start Game' component.
         * @returns {StartBlock} - Component.
         */
        getStartBlock: function() {
            return this._startBlock;
        },

        /**
         * Get 'End Game' component.
         * @returns {EndBlock} - Component.
         */
        getEndBlock: function() {
            return this._endBlock;
        },

        /**
         * Draw component.
         */
        render: function() {
            var canvas, header, startBlock, endBlock;

            // if we not appended to parent do this.
            if (!this._rendered) {
                var parent = this.getParentEl();
                parent.appendChild(this.getEl());
                this._rendered = true;
            }

            // Render 'Game Field'.
            canvas = this.getCanvas();
            canvas.render();

            // Render 'Header'.
            header = this.getHeader();
            header.render();

            // Render 'Start Game'.
            startBlock = this.getStartBlock();
            startBlock.render();

            // Render 'End Game'.
            endBlock = this.getEndBlock();
            endBlock.render();
        },

        /**
         * Reset game settings and rerender.
         */
        reset: function() {
            var canvas, header, startBlock, endBlock;

            // Turn off game.
            this._gameStarted = false;

            // Reset and hide 'Game field'.
            canvas = this.getCanvas();
            canvas.reset();
            canvas.setHidden(true);

            // Show 'Start Game'.
            startBlock = this.getStartBlock();
            startBlock.setHidden(false);

            // Hide 'End Game'.
            endBlock = this.getEndBlock();
            endBlock.setHidden(true);

            // Reset 'Header' and hide its childes.
            header = this.getHeader();
            header.reset();
            header.hideChildren();
        },

        /**
         * Start game.
         */
        start: function() {
            // Reset game settings.
            this.reset();
            // Redraw all.
            this.render();
        },

        /**
         * Game finish.
         */
        finish: function() {
            var canvas, header, endBlock;

            // Turn off game.
            this._gameStarted = false;

            // Hide 'Game Field'.
            canvas = this.getCanvas();
            canvas.setHidden(true);

            // Hide 'Header's elements
            header = this.getHeader();
            header.hideChildren();

            // Show 'End Game' block.
            endBlock = this.getEndBlock();
            endBlock.setHidden(false);
            endBlock.setScore(header.getScore().getValue());

            // Redraw all.
            this.render();

            // Clear timer.
            clearInterval(this._timerId);
        },

        /**
         * Ball's click handler.
         * @param {Ball} ball Ball element.
         * @param {Event} event Click event.
         */
        onBallDelete: function(ball, event) {
            if (this._gameStarted) {
                // пGet 'Header' component/
                var header = this.getHeader();

                // If ball is dropped.
                if ("drop" === event ) {
                    // If ball not Killer.
                    if (ball.getType() !== BallType.KILLER) {
                        // Remove 1 life.
                        header.addLife(-1);
                    } else {
                        // Else add score.
                        header.addScore(10);
                    }
                } else { // If mouseover.
                    // Check ball type.
                    switch (ball.getType()) {
                        case BallType.TYPE_1: // Add score.
                            header.addScore(random(1));
                            break;
                        case BallType.TYPE_2: // Add score.
                            header.addScore(random(2));
                            break;
                        case BallType.TYPE_3: // Add score.
                            header.addScore(random(1, 3));
                            break;
                        case BallType.TYPE_4: // Add score.
                            header.addScore(random(2, 4));
                            break;
                        case BallType.TYPE_5: // Add score.
                            header.addScore(random(3, 5));
                            break;
                        case BallType.EXTRA_TIME: // Add extra time, sec.
                            header.addTime(15);
                            break;
                        case BallType.EXTRA_LIFE: // Add extra life.
                            if (!header.isLifesEqual(5)) {
                                header.addLife(1);
                            } else { // If total lives more then 5 then add score.
                                header.addScore(10);
                            }
                            break;
                        case BallType.KILLER: // Remove 1 life.
                            header.addLife(-1);
                            break;
                    }
                }

                // If no life than we finish game.
                if (header.isLifesEqual(0)) {
                    this.finish();
                } else {
                    this.render();
                }
            }
        },

        /**
         * 'Start' button handler.'
         */
        onStartButtonClick: function() {
            if (!this._gameStarted) {
                var canvas, header, startBlock, endBlock;

                // Start gamem
                this._gameStarted = true;

                // Show 'Game Field' component.
                canvas = this.getCanvas();
                canvas.setHidden(false);

                // Show 'Header' component and it children.
                header = this.getHeader();
                header.showChildren();

                // Hide 'Start Game'.
                startBlock = this.getStartBlock();
                startBlock.setHidden(true);

                // Hide 'End Game'.
                endBlock = this.getEndBlock();
                endBlock.setHidden(true);

                // Start game timer.
                this._timerId = setInterval(this.onTimer, 1000, this);

                // Redraw all.
                this.render();

                // Create balls and run game.
                canvas.createBalls();
            }
        },

        /**
         * Timer handler.
         * @param {Game} self - Game component.
         */
        onTimer: function(self) {
            var header = self.getHeader();

            // Remove 1 sec.
            header.addTime(-1);

            // If time out then we finish gae.
            if (header.isTimeOut()) {
                self.finish();
            }
        },

        /**
         * 'Restart' button handler.
         * @param {EndBlock} endPanel - 'End game block/
         * @param {Event} event - Event
         * @param {Game} game - Game component
         */
        onRestartButtonClick: function(endBlock, event, game) {
            game.reset();
            game.render();
            game.onStartButtonClick();
        }
    };
}
