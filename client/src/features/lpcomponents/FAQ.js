import React from 'react'
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import './styles.css';
import styles from '../../styles/lpstyle'
import getIcon from '../../common/Icons';

const FAQ = () => {
    return (
        <div className='bg-hero w-full h-full p-6 border-b-2'>
            <div className='flex flex-col mx-auto py-6'>
                <div className='flex flex-col gap-2'>
                    <h1 className={`${styles.lpHeadingWhite} text-center`}>Frequently Asked Questions and Its Answers</h1>
                    <div className='p-12'>
                        <Accordion.Root className="AccordionRoot" type="single" collapsible>
                            <Accordion.Item className="AccordionItem" value="item-1">
                                <AccordionTrigger>Can I connect with investors for free on MergerHive?</AccordionTrigger>
                                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                            </Accordion.Item>

                            <Accordion.Item className="AccordionItem" value="item-2">
                                <AccordionTrigger>Is it unstyled?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It's unstyled by default, giving you freedom over the look and feel.
                                </AccordionContent>
                            </Accordion.Item>

                            <Accordion.Item className="AccordionItem" value="item-3">
                                <AccordionTrigger>Can it be animated?</AccordionTrigger>
                                <Accordion.Content className="AccordionContent">
                                    <div className="AccordionContentText">
                                        Yes! You can animate the Accordion with CSS or JavaScript.
                                    </div>
                                </Accordion.Content>
                            </Accordion.Item>
                            <Accordion.Item className="AccordionItem" value="item-4">
                                <AccordionTrigger>Can I connect with investors for free on MergerHive?</AccordionTrigger>
                                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                            </Accordion.Item>

                            <Accordion.Item className="AccordionItem" value="item-5">
                                <AccordionTrigger>Is it unstyled?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It's unstyled by default, giving you freedom over the look and feel.
                                </AccordionContent>
                            </Accordion.Item>

                            <Accordion.Item className="AccordionItem" value="item-6">
                                <AccordionTrigger>Can it be animated?</AccordionTrigger>
                                <Accordion.Content className="AccordionContent">
                                    <div className="AccordionContentText">
                                        Yes! You can animate the Accordion with CSS or JavaScript.
                                    </div>
                                </Accordion.Content>
                            </Accordion.Item>
                        </Accordion.Root>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
        <Accordion.Trigger
            className={classNames('AccordionTrigger', className)}
            {...props}
            ref={forwardedRef}
        >
            {children}
            {getIcon("downArrow", "1.2em")}
            {/* <ChevronDownIcon className="AccordionChevron" aria-hidden /> */}
        </Accordion.Trigger>
    </Accordion.Header>
));

const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
        className={classNames('AccordionContent', className)}
        {...props}
        ref={forwardedRef}
    >
        <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
));

export default FAQ