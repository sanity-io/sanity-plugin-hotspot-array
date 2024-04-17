// copied from react-hookz/web
// https://github.com/react-hookz/web/blob/579a445fcc9f4f4bb5b9d5e670b2e57448b4ee50/src/useResizeObserver/index.ts
import {type RefObject, useEffect, useRef} from 'react'

const isBrowser =
  typeof window !== 'undefined' &&
  typeof navigator !== 'undefined' &&
  typeof document !== 'undefined'

export type UseResizeObserverCallback = (entry: ResizeObserverEntry) => void

type ResizeObserverSingleton = {
  observer: ResizeObserver
  subscribe: (target: Element, callback: UseResizeObserverCallback) => void
  unsubscribe: (target: Element, callback: UseResizeObserverCallback) => void
}

let observerSingleton: ResizeObserverSingleton

function getResizeObserver(): ResizeObserverSingleton | undefined {
  if (!isBrowser) return undefined

  if (observerSingleton) return observerSingleton

  const callbacks = new Map<Element, Set<UseResizeObserverCallback>>()

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries)
      callbacks.get(entry.target)?.forEach((cb) =>
        setTimeout(() => {
          cb(entry)
        }, 0),
      )
  })

  observerSingleton = {
    observer,
    subscribe(target, callback) {
      let cbs = callbacks.get(target)

      if (!cbs) {
        // If target has no observers yet - register it
        cbs = new Set<UseResizeObserverCallback>()
        callbacks.set(target, cbs)
        observer.observe(target)
      }

      // As Set is duplicate-safe - simply add callback on each call
      cbs.add(callback)
    },
    unsubscribe(target, callback) {
      const cbs = callbacks.get(target)

      // Else branch should never occur in case of normal execution
      // because callbacks map is hidden in closure - it is impossible to
      // simulate situation with non-existent `cbs` Set
      /* istanbul ignore else */
      if (cbs) {
        // Remove current observer
        cbs.delete(callback)

        if (cbs.size === 0) {
          // If no observers left unregister target completely
          callbacks.delete(target)
          observer.unobserve(target)
        }
      }
    },
  }

  return observerSingleton
}

/**
 * Invokes a callback whenever ResizeObserver detects a change to target's size.
 *
 * @param target React reference or Element to track.
 * @param callback Callback that will be invoked on resize.
 * @param enabled Whether resize observer is enabled or not.
 */
export function useResizeObserver<T extends Element>(
  target: RefObject<T> | T | null,
  callback: UseResizeObserverCallback,
  enabled = true,
): void {
  const ro = enabled && getResizeObserver()
  const cb = useRef(callback)
  cb.current = callback

  const tgt = target && 'current' in target ? target.current : target

  useEffect(() => {
    // This secondary target resolve required for case when we receive ref object, which, most
    // likely, contains null during render stage, but already populated with element during
    // effect stage.

    const _tgt = target && 'current' in target ? target.current : target

    if (!ro || !_tgt) return undefined

    // As unsubscription in internals of our ResizeObserver abstraction can
    // happen a bit later than effect cleanup invocation - we need a marker,
    // that this handler should not be invoked anymore
    let subscribed = true

    const handler: UseResizeObserverCallback = (...args) => {
      // It is reinsurance for the highly asynchronous invocations, almost
      // impossible to achieve in tests, thus excluding from LOC
      /* istanbul ignore else */
      if (subscribed) {
        cb.current(...args)
      }
    }

    ro.subscribe(_tgt, handler)

    return () => {
      subscribed = false
      ro.unsubscribe(_tgt, handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tgt, ro])
}
