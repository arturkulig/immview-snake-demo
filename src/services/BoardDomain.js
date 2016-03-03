import * as I from 'immutable';

import {
    View,
    Data,
    Domain
} from 'immview';

const boardFieldTypes = {
    EMPTY: 0,
    SNAKE: 1,
    TREAT: 2,
};

class BoardDomain extends Domain {
    constructor({boardSize,SnakeDomain,TreatDomain,RoundDomain}) {

        let board = new View(
            {
                snake: SnakeDomain.view,
                treat: TreatDomain.view,
            },
            data => {

                if (
                    data.get('snake') &&
                    data.get('treat')
                ) {

                    let emptyBoard = I.Map();

                    let range = I.Range(0, boardSize).toList();
                    range.forEach(x => {
                        range.forEach(y => {
                            emptyBoard = emptyBoard.set(I.Map({x, y}), boardFieldTypes.EMPTY);
                        });
                    });

                    let board = emptyBoard;

                    data.get('snake').forEach((position) => {
                        board = board.set(position, boardFieldTypes.SNAKE);
                    });

                    let treat = data.get('treat')
                    board = board.set(treat, boardFieldTypes.TREAT);

                    /** board rules */

                    var head = data.get('snake').last();

                    /** 1. if head touches a treat, player gets a point */
                    if (I.is(head, treat)) {
                        TreatDomain.spawn();
                        RoundDomain.increase();
                    }

                    /** 2. if snake head reaches same position
                     * as any previous position of a body
                     * player looses
                     */
                    if (data.get('snake').butLast().find(v => I.is(v,head))) {
                        RoundDomain.loose();
                    }

                    /** 3. if treat appeared on position of snake's body
                     * but not the head
                     * then respawn the treat without points increase
                     */
                    if (data.get('snake').butLast().find(v => I.is(v,treat))) {
                        TreatDomain.spawn();
                    }

                    return board;
                } else {
                    return I.Map();
                }
            }
        );

        super(
            board,
            {}
        );

        this.fieldTypes = boardFieldTypes;
    }
}

export default BoardDomain;
