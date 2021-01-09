import {scaleLinear, select, selectAll, Selection} from 'd3';
import React, {useEffect, useRef, useState} from 'react';
import {useResizeObserver} from "../../utils/Utils";
import {anger, disgust, fear, joy, neutral, sadness, surprise} from "../../providers/emotion/EmotionProvider";

const data = [
    sadness,
    joy,
    fear,
    anger,
    disgust,
    surprise,
    neutral
]

function EmotionsCircle() {

    const svgRef = useRef(null)

    const rootRef = useRef(null)

    const dimensions = useResizeObserver(rootRef)

    const [selection, setSelection] = useState<null | Selection<null, unknown, null, undefined>>(null)

    useEffect(() => {

        // if there is no dimensions
        if (!dimensions)
            // return
            return

        // if there is no selection
        if (!selection) {
            // set it to currnet ref
            setSelection(select(svgRef.current))
        } else {

            // clear svg
            selection.select('g').remove()
            selection.select('defs').remove()

            // required values
            // max, min dimensions
            const min = Math.min(dimensions.height, dimensions.width)
            const max = Math.max(dimensions.height, dimensions.width)

            // center point
            const cx = dimensions.width / 2
            const cy = dimensions.height / 2

            // radius of circles
            let rad = min * 0.08
            // if smaller than 50
            if (rad < 60)
                // set it to 60
                rad = 60

            // outer ring rad
            const outerRing = rad * 3

            // outer ring scalar
            const outerRingScale = scaleLinear()
                .domain([-1.5, 1.5])
                .range([-outerRing, outerRing])


            const circleMouseEnter = (event: any, data: any) => {
                selectAll('.flyCircle')
                    .filter(datum => datum === data)
                    .transition()
                    .duration(500)
                    .attr('r', rad + (rad * 0.1))
            }

            const circleMouseLeave = (event: any, data: any) => {
                selectAll('.flyCircle')
                    .filter(datum => datum === data)
                    .transition()
                    .duration(500)
                    .attr('r', rad)
            }


            // enter transition
            const enter = () => {

                let circles = selectAll('.flyCircle')

                // all labels
                let labels = selectAll('.label')
                    // add events
                    .on('mouseenter', circleMouseEnter)
                    .on('mouseleave', circleMouseLeave)
                    .on('click', exit)

                let duration = 1000, delay = 50

                // // the selected circle
                // let selected = circles.filter((datum: any) => datum === d)
                //
                // // other circles
                // let others = circles.filter((datum: any) => datum !== d)

                circles
                    // add events
                    .on('mouseenter', circleMouseEnter)
                    .on('mouseleave', circleMouseLeave)
                    .on('click', exit)
                    .transition('outward')
                    .duration(duration).delay((_, i) => i * delay)
                    .attr('cx', (d: any) => {
                        if (d.data === neutral)
                            return 0
                        else
                            return outerRingScale(Math.cos(d.pos))
                    })
                    .attr('cy', (d: any) => {
                        if (d.data === neutral)
                            return 0
                        else
                            return outerRingScale(Math.sin(d.pos))
                    })
                    .attr('r', rad)
                    .on('end', () => {
                        labels
                            .transition()
                            .attr('opacity', 1)
                    })
            }

            // exit transition
            const exit = (event: any, d: any) => {

                // all circles
                let circles = selectAll('.flyCircle')
                    // clear mouse events
                    .on('mouseenter', null)
                    .on('mouseleave', null)
                    .on('click', null)

                // all labels
                let labels = selectAll('.label')
                    // clear mouse events
                    .on('mouseenter', null)
                    .on('mouseleave', null)
                    .on('click', null)

                // the selected circle
                let selected = circles.filter((datum: any) => datum === d)

                // other circles
                let others = circles.filter((datum: any) => datum !== d)

                // animation duration
                let duration = 1000, delay = 50

                // labels transition
                labels
                    // start transition
                    .transition()
                    // half duration
                    .duration(duration / 2)
                    // hide it
                    .attr('opacity', 0)

                // other circle transition
                others
                    // start transition
                    .transition()
                    .duration(duration).delay((_, i) => steps * delay + i * delay)
                    // go to center
                    .attr('cx', 0)
                    .attr('cy', 0)
                    // on transition end
                    .on('end', () => {
                        others
                            // do another
                            .transition()
                            // half the time
                            .duration(duration / 2)
                            // radius to 0
                            .attr('r', 0)
                    })

                // selected circle transition
                selected
                    .on('click', enter)
                    // start the transition
                    .transition()
                    .duration(duration)
                    .delay(duration)
                    // go to center
                    .attr('cx', 0)
                    .attr('cy', 0)
                    // on transition end
                    .on('end', () => {
                        selected
                            // do another transition
                            .transition()
                            .duration(duration/2)
                            // fill the whole screen
                            .attr('r', max)
                    })
            }

            // root group
            const group = selection
                .append('g')
                // translate the group to center
                .attr('transform', `translate(${cx},${cy})`)

            // filter group, any element in this group will have
            // gooey effect
            const filterGroup = group
                .append('g')
                // refer to gooey effect
                .style('filter', 'url(#gooeyEffect)')

            // creating the filter
            const filter = selection.append('defs')
                .append('filter')
                .attr('id', 'gooeyEffect')

            // applying blur effect
            filter.append('feGaussianBlur')
                .attr('in', 'SourceGraphic')
                .attr('stdDeviation', '10')
                // add color transition
                .attr('color-interpolation-filters', 'sRGB')
                .attr('result', 'blur')

            // applying transformation matrix
            filter.append('feColorMatrix')
                .attr('in', 'blur')
                .attr('mode', 'matrix')
                .attr('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 120 -115')
                .attr('result', 'gooey')

            // apply composite atop to effect
            // rect and sharp angles
            filter.append('feComposite')
                .attr('in', 'SourceGraphic')
                .attr('in2', 'gooey')
                .attr('operator', 'atop')

            // drawing emotions
            let steps = data.length - 1


            // mapping data to circle form
            const mappedData = data.map((d, i) => {
                return {
                    data: d,
                    // if neutral, pos will be 0
                    pos: d === neutral ? 0 : (i / steps) * (2 * Math.PI)
                }
            })

            // select all flyCircle
            filterGroup.selectAll('.flyCircle')
                // provide data and map it to its position
                .data(mappedData)
                .join('circle')
                .attr('class', 'flyCircle')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', rad)
                .style('fill', d => d.data.color)

            group.selectAll('.label')
                .data(mappedData)
                .join('text')
                .attr('x', d => {
                    if (d.data === neutral)
                        return 0
                    return outerRingScale(Math.cos(d.pos))
                })
                .attr('y', d => {
                    if (d.data === neutral)
                        return 0
                    return outerRingScale(Math.sin(d.pos))
                })
                .attr('class', 'label select-none font-semibold text-sm md:text-xl uppercase')
                .attr('fill', '#424242')
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'center')
                .attr('opacity', 0)
                .text(d => d.data.name)
                .call(enter)

            // filterGroup.selectAll('.centerCircle')
            //     .data([neutral])
            //     .join('circle')
            //     .attr('class', 'centerCircle')
            //     .attr('cx', 0)
            //     .attr('cy', 0)
            //     .attr('r', rad)
            //     .style('fill', d => d.color)
            //     .call(enter)
            //     .on('click', exit)
        }

    }, [dimensions, selection])

    return (
        <div
            ref={rootRef}
            className="absolute h-screen w-screen flex justify-center items-center transition-all duration-500"
            id="emotion_circle">
            <svg ref={svgRef} className='h-full w-full'/>
        </div>
    );
}

export default EmotionsCircle;