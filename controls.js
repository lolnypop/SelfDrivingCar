class Controls {
    constructor() {
        this.forward = false;
        this.backward = false;
        this.left = false;
        this.right = false;

        this.#addKeyboardListeners();

    }

    #addKeyboardListeners() {
        document.addEventListener('keydown', (event) => {
            if (['ArrowUp', 'ArrowDown', 'Space'].includes(event.code)) {
                event.preventDefault();
            }

            switch (event.key) {
                case 'ArrowUp':
                case 'w':
                    this.forward=true;
                    break;

                case 'ArrowLeft':
                case 'a':
                    this.left=true;
                    break;

                case 'ArrowRight':
                case 'd':
                    this.right=true;
                    break;

                case 'ArrowDown':
                case 's':
                    this.backward=true;
                    break;
            }

            console.table(this);
        });

        document.addEventListener('keyup', (event) => {
            if (['ArrowUp', 'ArrowDown', 'Space'].includes(event.code)) {
                event.preventDefault();
            }

            switch (event.key) {
                case 'ArrowUp':
                case 'w':
                    this.forward=false;
                    break;

                case 'ArrowLeft':
                case 'a':
                    this.left=false;
                    break;

                case 'ArrowRight':
                case 'd':
                    this.right=false;
                    break;

                case 'ArrowDown':
                case 's':
                    this.backward=false;
                    break;
            }

            console.table(this);
        });
    }
}