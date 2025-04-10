<template>
  <div class="mermaid-container" v-if="mounted">
    <!-- Desktop Controls -->
    <div class="desktop-controls controls visible-controls" ref="controls">
      <button @click="zoomIn" title="Zoom In">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </button>
      <span class="zoom-level">{{ Math.round(scale * 100) }}%</span>
      <button @click="zoomOut" title="Zoom Out">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </button>
      <button @click="resetView" title="Reset View">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor">
          <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.9 3.2L21 8"></path>
          <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.9-3.2L3 16"></path>
        </svg>
      </button>
      <button @click="copyDiagramCode" title="Copy Code">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <span v-if="showCopied" class="copied-notification">Copied</span>
      </button>
      <button @click="toggleFullscreen" title="Toggle Fullscreen">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3">
          </path>
        </svg>
      </button>
    </div>

    <!-- Mobile Controls -->
    <div class="mobile-controls controls visible-controls" ref="mobileControls">
      <div class="mobile-zoom-controls">
        <button @click="zoomIn" title="Zoom In">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </button>
        <span class="zoom-level">{{ Math.round(scale * 100) }}%</span>
        <button @click="zoomOut" title="Zoom Out">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </button>
      </div>

      <div class="mobile-nav-buttons">
        <button @click="panUp" title="Pan Up">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
        <button @click="panDown" title="Pan Down">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
        <button @click="panLeft" title="Pan Left">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor">
            <path d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
        </button>
        <button @click="panRight" title="Pan Right">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div class="mobile-utility-controls">
        <button @click="resetView" title="Reset View">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor">
            <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.9 3.2L21 8"></path>
            <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.9-3.2L3 16"></path>
          </svg>
        </button>
        <button @click="toggleFullscreen" title="Toggle Fullscreen">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3">
            </path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Error display -->
    <div v-if="renderError" class="diagram-error">
      <div class="error-message">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>Failed to render diagram</span>
        <button @click="toggleErrorDetails" class="error-toggle-button">
          {{ showErrorDetails ? 'Hide Details' : 'Show Details' }}
        </button>
      </div>
      <pre v-if="showErrorDetails" class="error-details">{{ renderErrorDetails }}</pre>
    </div>

    <div class="diagram-wrapper" ref="diagramWrapper" @mousedown="startPan" @mousemove="pan" @mouseup="endPan"
      @mouseleave="endPan" @wheel="handleWheel" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      :style="{
        cursor: dragEnabled ? isPanning ? 'grabbing' : 'grab' : 'auto',
      }"
    >
      <div :id="id" class="mermaid" :style="{
        opacity: isRendered ? 1 : 0,
        transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
        cursor: dragEnabled ? isPanning ? 'grabbing' : 'grab' : 'auto',
      }"
      >
        {{ code }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" clientOnly>
import { onMounted, ref, onUnmounted, nextTick } from "vue";
import { onClickOutside } from "@vueuse/core"
import mermaid, { MermaidConfig } from "mermaid";
import "./style.css";

// Define emits
const emit = defineEmits<{
  (event: 'renderComplete', payload: { id: string; success: boolean; error?: unknown }): void;
}>();

// Client-side rendering guard
const mounted = ref(false);

const props = defineProps<{
  code: string;
  config?: MermaidConfig;
}>();

// Error handling states
const renderError = ref(false);
const renderErrorDetails = ref('');
const showErrorDetails = ref(false);

// Initialize mermaid with default or provided config
onMounted(() => {
  // Set mounted to true only in client environment
  mounted.value = true;

  const defaultConfig: MermaidConfig = {
    theme: "default",
    securityLevel: "loose",
    startOnLoad: false,
    flowchart: {
      useMaxWidth: false,
      htmlLabels: true,
    },
    sequence: {
      diagramMarginX: 50,
      diagramMarginY: 10,
      actorMargin: 50,
      width: 150,
      height: 65,
      boxMargin: 10,
      boxTextMargin: 5,
      noteMargin: 10,
      messageMargin: 35,
      mirrorActors: true,
      bottomMarginAdj: 1,
      useMaxWidth: false,
      rightAngles: false,
      showSequenceNumbers: false,
    },
    gantt: {
      useMaxWidth: false,
      topPadding: 50,
      leftPadding: 50,
      rightPadding: 50,
      gridLineStartPadding: 35,
      barHeight: 50,
      barGap: 40,
      displayMode: "compact",
      axisFormat: "%Y-%m-%d",
      topAxis: false,
      tickInterval: "day",
      useWidth: 2048,
    },
    class: {
      arrowMarkerAbsolute: false,
      useMaxWidth: false,
    },
    journey: {
      useMaxWidth: false,
    },
    pie: {},
  };

  mermaid.initialize({
    ...defaultConfig,
    ...props.config,
  });
});

const showCopied = ref(false);
const controls = ref<HTMLElement | null>(null);
const mobileControls = ref<HTMLElement | null>(null);
const diagramWrapper = ref<HTMLElement | null>(null);
const isFullscreen = ref(false);

const toggleErrorDetails = () => {
  showErrorDetails.value = !showErrorDetails.value;
};

const copyDiagramCode = async () => {
  try {
    if (!navigator.clipboard) {
      throw new Error('Clipboard API not available in this browser.');
    }
    await navigator.clipboard.writeText(props.code);
    showCopied.value = true;
    setTimeout(() => {
      showCopied.value = false;
    }, 1000);
  } catch (err) {
    console.error("Failed to copy diagram code:", err);
    // Show user feedback for clipboard error
    alert('Failed to copy to clipboard. Your browser might not support this feature.');
  }
};

const id = `mermaid-${Math.random().toString(36).slice(2)}`;
const isRendered = ref(false);
const scale = ref(1);
const translateX = ref(0);
const translateY = ref(0);
const isPanning = ref(false);
const lastX = ref(0);
const lastY = ref(0);
const originalDiagramSize = ref({ width: 0, height: 0 });
// 新增拖动启用状态变量
const dragEnabled = ref(false);

// Touch event variables
const initialTouchDistance = ref(0);
const touchPanning = ref(false);
const lastTouchX = ref(0);
const lastTouchY = ref(0);

const zoomIn = () => {
  scale.value = scale.value * 1.2;
};

const zoomOut = () => {
  if (scale.value > 0.2) { // Prevent extreme zooming out
    scale.value = scale.value / 1.2;
  }
};

const resetView = () => {
  scale.value = 1;
  translateX.value = 0;
  translateY.value = 0;
};

const toggleFullscreen = () => {
  try {
    if (!document.fullscreenElement) {
      if (diagramWrapper.value?.requestFullscreen) {
        diagramWrapper.value.requestFullscreen();
      } else if ((diagramWrapper.value as any)?.webkitRequestFullscreen) {
        (diagramWrapper.value as any).webkitRequestFullscreen();
      } else if ((diagramWrapper.value as any)?.mozRequestFullScreen) {
        (diagramWrapper.value as any).mozRequestFullScreen();
      } else if ((diagramWrapper.value as any)?.msRequestFullscreen) {
        (diagramWrapper.value as any).msRequestFullscreen();
      } else {
        throw new Error('Fullscreen API not available');
      }
      isFullscreen.value = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
      isFullscreen.value = false;
    }
  } catch (err) {
    console.error("Fullscreen error:", err);
    alert('Fullscreen mode is not supported in this browser.');
  }
};

// 点击外部区域取消激活
onClickOutside(diagramWrapper, () => {
  dragEnabled.value = false;
  diagramWrapper.value?.classList.remove("drag-active");
});

const activateDrag = (e: MouseEvent) => {
  // 阻止事件冒泡避免立即触发外部点击检测
  e.stopPropagation();
  dragEnabled.value = true;
  diagramWrapper.value?.classList.add("drag-active");
};

const startPan = (e: MouseEvent) => {
  activateDrag(e)
  // if (!dragEnabled.value) return; // 点击后才触发
  isPanning.value = true;
  lastX.value = e.clientX;
  lastY.value = e.clientY;
};

const pan = (e: MouseEvent) => {
  if (!isPanning.value) return;

  const deltaX = e.clientX - lastX.value;
  const deltaY = e.clientY - lastY.value;

  translateX.value += deltaX / scale.value;
  translateY.value += deltaY / scale.value;

  lastX.value = e.clientX;
  lastY.value = e.clientY;
};

const endPan = () => {
  isPanning.value = false;
};

// Touch event handlers
const handleTouchStart = (e: TouchEvent) => {
  if (!dragEnabled.value) return; // 点击后才触发

  if (e.touches.length === 1) {
    // Single touch - pan
    touchPanning.value = true;
    lastTouchX.value = e.touches[0].clientX;
    lastTouchY.value = e.touches[0].clientY;
  } else if (e.touches.length === 2) {
    // Two touches - pinch zoom
    touchPanning.value = false;
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    initialTouchDistance.value = Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );
  }
};

const handleTouchMove = (e: TouchEvent) => {
  if (!dragEnabled.value) return; // 点击后才触发

  e.preventDefault(); // Prevent scrolling while interacting with diagram

  if (touchPanning.value && e.touches.length === 1) {
    // Handle panning
    const touch = e.touches[0];
    const deltaX = touch.clientX - lastTouchX.value;
    const deltaY = touch.clientY - lastTouchY.value;

    translateX.value += deltaX / scale.value;
    translateY.value += deltaY / scale.value;

    lastTouchX.value = touch.clientX;
    lastTouchY.value = touch.clientY;
  } else if (e.touches.length === 2) {
    // Handle pinch zooming
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    const currentDistance = Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );

    if (initialTouchDistance.value > 0) {
      const zoomRatio = currentDistance / initialTouchDistance.value;

      // Apply a dampening factor to make zooming less sensitive
      const newScale = scale.value * (1 + (zoomRatio - 1) * 0.2);

      // Limit scale to reasonable bounds
      if (newScale >= 0.2 && newScale <= 10) {
        scale.value = newScale;
      }

      initialTouchDistance.value = currentDistance;
    }
  }
};

const handleTouchEnd = () => {
  touchPanning.value = false;
  initialTouchDistance.value = 0;
};

const handleWheel = (e: WheelEvent) => {
  if (!dragEnabled.value) return; // 点击后才触发

  if (e.ctrlKey || e.metaKey) {
    e.preventDefault(); // 激活时阻止默认行为
    // Zoom
    const delta = -Math.sign(e.deltaY) * 0.1;
    const newScale = scale.value * (1 + delta);

    // Apply bounds to prevent extreme zooming
    if (newScale >= 0.2 && newScale <= 10) {
      scale.value = newScale;
    }
  } else {
    // Pan
    // translateX.value += -e.deltaX / scale.value;
    // translateY.value += -e.deltaY / scale.value;
  }
};

const PAN_STEP = 50; // Pixels to pan per button press

const panUp = () => {
  translateY.value -= PAN_STEP / scale.value;
};

const panDown = () => {
  translateY.value += PAN_STEP / scale.value;
};

const panLeft = () => {
  translateX.value -= PAN_STEP / scale.value;
};

const panRight = () => {
  translateX.value += PAN_STEP / scale.value;
};

// Track fullscreen changes to update controls visibility
const updateFullscreenControls = () => {
  try {
    if (document.fullscreenElement) {
      isFullscreen.value = true;
      if (controls.value) {
        controls.value.classList.add("force-show");
      }
      if (mobileControls.value) {
        mobileControls.value.classList.add("force-show");
      }
    } else {
      isFullscreen.value = false;
      if (controls.value) {
        controls.value.classList.remove("force-show");
      }
      if (mobileControls.value) {
        mobileControls.value.classList.remove("force-show");
      }
    }
  } catch (err) {
    console.error("Error updating fullscreen controls:", err);
  }
};

const renderMermaidDiagram = async (retryCount = 0, maxRetries = 3): Promise<void> => {
  try {
    let element = document.getElementById(id);
    if (!element) {
      console.warn(`[Mermaid] Diagram container element not found, attempt ${retryCount + 1}/${maxRetries + 1}`);
      if (retryCount < maxRetries) {
        // Add a progressive delay before retrying
        const delay = 100 * Math.pow(2, retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));
        return renderMermaidDiagram(retryCount + 1, maxRetries);
      }
      throw new Error("Failed to find diagram container element");
    }

    // Add a class to indicate rendering is in progress
    element.classList.add('mermaid-rendering');

    try {
      const isProduction =
        typeof window !== 'undefined'


      await mermaid.run({
        nodes: [element],
        suppressErrors: false,
      });

      // Add a longer delay for production environments
      await new Promise(resolve => setTimeout(resolve, isProduction ? 150 : 50));

      isRendered.value = true;
      renderError.value = false;

      // Remove the rendering indicator class
      element.classList.remove('mermaid-rendering');

      // Store original diagram size
      if (element.firstElementChild) {
        const svgElement = element.querySelector("svg");
        if (svgElement) {
          // Wait for SVG to be fully rendered, longer in production
          await new Promise(resolve => setTimeout(resolve, isProduction ? 150 : 50));
          originalDiagramSize.value = {
            width: svgElement.getBoundingClientRect().width,
            height: svgElement.getBoundingClientRect().height,
          };
        }
      }

      // Emit an event when rendering is complete
      emit('renderComplete', { id, success: true });
    } catch (error) {
      console.error("Failed to render mermaid diagram:", error);
      renderError.value = true;
      renderErrorDetails.value = error instanceof Error
        ? error.toString()
        : 'Unknown error rendering diagram';

      // Still mark as rendered to display the error message
      isRendered.value = true;

      // Remove the rendering indicator class
      element.classList.remove('mermaid-rendering');

      // Emit error event
      emit('renderComplete', { id, success: false, error });

      // In production, try one more time with a delay if this is the first error
      const isProduction =
        typeof window !== 'undefined'

      if (isProduction && retryCount === 0) {
        setTimeout(() => {
          renderMermaidDiagram(retryCount + 1, maxRetries);
        }, 1000);
      }
    }
  } catch (error) {
    console.error("Error in diagram initialization:", error);
    renderError.value = true;
    renderErrorDetails.value = error instanceof Error
      ? error.toString()
      : 'Unknown error initializing component';

    // Emit error event
    emit('renderComplete', { id, success: false, error });
  }
};

onMounted(async () => {
  try {
    // Set controls visible immediately 
    if (controls.value) {
      controls.value.style.opacity = "1";
      controls.value.style.visibility = "visible";
    }

    if (mobileControls.value) {
      mobileControls.value.style.opacity = "1";
      mobileControls.value.style.visibility = "visible";
    }

    // Use nextTick to ensure the DOM is updated
    await nextTick();

    // Start the rendering process with retry capabilities
    await renderMermaidDiagram();

    // Add fullscreen change event listeners with cross-browser support
    document.addEventListener("fullscreenchange", updateFullscreenControls);
    document.addEventListener("webkitfullscreenchange", updateFullscreenControls);
    document.addEventListener("mozfullscreenchange", updateFullscreenControls);
    document.addEventListener("MSFullscreenChange", updateFullscreenControls);

  } catch (error) {
    console.error("Error in component initialization:", error);
    renderError.value = true;
    renderErrorDetails.value = error instanceof Error
      ? error.toString()
      : 'Unknown error initializing component';

    // Emit error event
    emit('renderComplete', { id, success: false, error });
  }
});

// Clean up event listeners
onUnmounted(() => {
  document.removeEventListener("fullscreenchange", updateFullscreenControls);
  document.removeEventListener("webkitfullscreenchange", updateFullscreenControls);
  document.removeEventListener("mozfullscreenchange", updateFullscreenControls);
  document.removeEventListener("MSFullscreenChange", updateFullscreenControls);
});
</script>
