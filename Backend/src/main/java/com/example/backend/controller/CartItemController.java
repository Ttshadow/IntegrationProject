package com.example.backend.controller;

import com.example.backend.entity.CartItem;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.service.CartItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartItemController {
    public final CartItemService cartItemService;

    public CartItemController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }

    @GetMapping
    public List<CartItem> getAllCartItemsByUserId(Long userId){
        return cartItemService.getAllCartItemByUserId(userId);
    }

    @PostMapping("/add_to_cart")
    public ResponseEntity addToCart(@RequestBody CartItem cartItem) throws RecordNotFoundException {
        cartItemService.saveOrUpdateCartItem(cartItem);
        return ResponseEntity.ok(cartItem);
    }

    @PutMapping("/update_quantity{id}")
    public CartItem updateQuantity(@PathVariable Long id, Integer qty) throws RecordNotFoundException {
        cartItemService.updateCartItemQuantity(id, qty);
        return cartItemService.getCartItemById(id);
    }

    @DeleteMapping("/remove_item/{id}")
    public void deleteItem(@PathVariable Long id){
        cartItemService.deleteCartItemById(id);
    }

    @DeleteMapping("/remove_all_items/{id}")
    public void removeAllItemsByUserId(@PathVariable Long id){
        cartItemService.deleteCartItemByUserId(id);
    }
}
